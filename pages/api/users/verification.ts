import cassandra from 'cassandra-driver';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import jwt from 'jsonwebtoken';
dotenv.config();

const cassandraClient = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'markdown_messenger',
});

interface EnviromentVariables {
    [key: string]: string;
}

type JwtPayload = {
    email: string,
    userName: string,
    passwordHash: string,
    verificationCodeHash: string,
    iat: number,
    exp: number
}

const addUser = async (email: string, passwordHash: string, userName: string, res: NextApiResponse) => {
    await cassandraClient.batch([
        {
            query: `INSERT INTO markdown_messenger.credentials_by_user
            (email, password_hash)
            VALUES ('${email}', '${passwordHash}');`
        },
        {
            query: `INSERT INTO markdown_messenger.settings_by_user
            (email, avatar_url, name, status)
            VALUES ('${email}', '/images/default-profile-image.png', '${userName}', true);`
        }
        ]
            )
        .then(()=>{
            res.status(200).json(jwt.sign({ user: email }, (process.env as EnviromentVariables).JWTSECRET, { expiresIn: '15m' }));
        })
        .catch((error)=>{ throw error;});
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    switch(req.method){
        case 'POST':
            try{
                // Check validity of JWT
                const jwtPayload = jwt.verify(req.body.JWT, (process.env as EnviromentVariables).JWTSECRET) as JwtPayload;
                
                // Check if the verificationCode matches the previously generated Hash
                if(!await bcrypt.compare(req.body.verificationCode, jwtPayload.verificationCodeHash)){
                    throw new Error('invalid verificationCode');
                }

                // Add the User to the Database and respond with a new session
                await addUser(jwtPayload.email, jwtPayload.passwordHash, jwtPayload.userName, res);
                
            }catch(error: any){
                switch(error.message){
                    case 'jwt expired':
                        res.status(400).json(`Oops! Looks like this token expired. Sign up to receive a new token with an associated verification email.`);
                        break;

                    case 'data and hash arguments required':
                    case 'jwt malformed':
                    case 'jwt must be provided':
                        res.status(400).json(`Oops! Looks like you don't have a token! Sign up with this device to receive a new token with an associated verification email.`);
                        break;

                    case 'invalid verificationCode':
                        res.status(400).json(`Oops! Looks like you clicked the wrong link. Sign up to receive a new token with an associated verification email.`);
                        break;

                    default:
                        console.log(`Error during verification: ${error}`);
                        res.status(400).json(`400 Bad Request`);
                }
            }
            
            break;
        
        default:
            res.status(405).json(`Method ${req.method} Not Allowed`);
        }
}