import cassandra from 'cassandra-driver';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { EnviromentVariables, JwtPayload } from './contacts';
import { validate } from 'email-validator';
import { Construction } from '@mui/icons-material';
dotenv.config();
var jwt = require('jsonwebtoken');

const cassandraClient = new cassandra.Client({
    cloud: {
      secureConnectBundle: "utilities/secure-connect-markdown-messenger.zip",
    },
    credentials: {
      username: process.env.DATASTAXCLIENTID as string,
      password: process.env.DATASTAXCLIENTSECRET as string,
    }
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    try{
        await cassandraClient.connect();
        const jwtPayload = jwt.verify(req.cookies.JSON_WEB_TOKEN, (process.env as EnviromentVariables).JWTSECRET) as JwtPayload;
        
        if(req.query.user !== jwtPayload.user){
            switch(req.method){
                case 'GET':
                    if(validate(req.query.user as string)){
                        const verificationHash = await bcrypt.hash(`${jwtPayload.user}${req.query.user}${process.env.INVITATIONSECRET}`, 10);
                        res.status(200).json(`?verificationHash=${verificationHash}&user=${jwtPayload.user}`);
                    }else{
                        res.status(400).json(`${req.query.user} is not a valid email address`);
                    }

                    break;

                case 'POST':
                    if(validate(req.query.user as string)){
                        if(await bcrypt.compare(`${req.query.user}${jwtPayload.user}${process.env.INVITATIONSECRET}`, req.query.verificationHash as string)){  
                            await cassandraClient.batch([
                                {
                                    query: `INSERT INTO markdown_messenger.contacts_by_user
                                    (email, contact)
                                    VALUES ('${jwtPayload.user}', '${req.query.user}');`
                                },
                                {
                                    query: `INSERT INTO markdown_messenger.contacts_by_user
                                    (email, contact)
                                    VALUES ('${req.query.user}', '${jwtPayload.user}');`
                                }
                            ]);
                            
                            res.status(200).json(`🎉 User ${req.query.user} is now in your contacts!`);
                        }else{
                            res.status(400).json(`Oops! Looks like you got the wrong link.`);
                        }
                    }else{
                        console.log(req.query.user);
                        res.status(400).json(`Bad Request`);
                    }
                    
                    break;
                
                default:
                    res.status(405).json(`Method ${req.method} Not Allowed`)
            }
        }else{
            res.status(400).json(`You can't add yourself.`);
        }
    }catch(error: any){
        switch(error.message){

            case 'jwt expired':
                res.status(400).json(`Oops! Looks like your token expired. Please Log in.`);
                break;

            case 'jwt must be provided':
                res.status(400).json(`Oops! Looks like you don't have a token. Please Log in.`);
                break;

            default:
                console.log(`Error during user invitation: ${error}`);
                res.status(400).json(`Bad Request`);
        }
    }
}
