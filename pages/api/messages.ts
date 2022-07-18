import cassandra from 'cassandra-driver';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { EnviromentVariables, JwtPayload } from './contacts';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

type Data = {};

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
  res: NextApiResponse<Data>,
) {
    try{
        await cassandraClient.connect();
        const jwtPayload = jwt.verify(req.cookies.JSON_WEB_TOKEN, (process.env as EnviromentVariables).JWTSECRET) as JwtPayload;
        
        switch(req.method){
            case 'GET':
                const allMessagesResult = [
                    ...(await cassandraClient.execute(
                        `SELECT email, created_at, message 
                        FROM markdown_messenger.message_by_user 
                        WHERE email='${jwtPayload.user}' AND target='${req.query.contact}';`)).rows,

                    ...(await cassandraClient.execute(
                        `SELECT email, created_at, message 
                        FROM markdown_messenger.message_by_user 
                        WHERE email='${req.query.contact}' AND target='${jwtPayload.user}';`)).rows
                ];
                
                res.status(200).json(allMessagesResult.sort(function(a,b){
                    return a.created_at - b.created_at;
                }));
                
                break;
            
            case 'POST':
                if((await cassandraClient.execute(`SELECT * FROM markdown_messenger.contacts_by_user WHERE email='${jwtPayload.user}' AND contact='${req.body.target}';`)).rowLength){
                    if (req.body.message !== '<!--write your message here-->\n' && req.body.message){
                        await cassandraClient.execute(`INSERT INTO markdown_messenger.message_by_user
                        (email, target, created_at, message)
                        VALUES
                        ('${jwtPayload.user}', '${req.body.target}', toTimeStamp(now()), '${req.body.message.replaceAll("'", "''")}');`)

                        res.status(200).json('Your message was sent successfully!');
                    }else{
                        throw new Error('no message specified');
                    }
                }else{
                    throw new Error(`target user not in contacts`);
                }

                break;
            
            default:
                res.status(405).json(`Method ${req.method} Not Allowed`);
        }
    }catch(error: any){
        switch(error.message){

            case 'jwt expired':
            res.status(400).json(`Oops! Looks like your token expired. Please Log in.`);
            break;

            case 'jwt must be provided':
                res.status(400).json(`Oops! Looks like you don't have a token. Please Log in.`);
                break;

            case 'target user not in contacts':
                res.status(400).json(`Oops! Looks like you don't have ${req.body.target} in your contacts. You can try adding them through an invitation link.`);
                break;

            case 'no message specified':
                res.status(400).json(`Oops! Looks like you didn't specify a message to be sent.`);
                break;

            default:
                console.log(`Error whilst getting a users messages: ${error}`);
                res.status(400).json(`Bad Request`);
        }
    }
}
