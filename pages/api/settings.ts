import cassandra from 'cassandra-driver';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { EnviromentVariables, JwtPayload } from './contacts';

type Data = {};

const cassandraClient = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'markdown_messenger',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    try{
        const jwtPayload = jwt.verify(req.cookies.JSON_WEB_TOKEN, (process.env as EnviromentVariables).JWTSECRET) as JwtPayload;
        
        switch(req.method){
            case 'GET':

                res.status(200).json((await cassandraClient.execute(`SELECT * FROM markdown_messenger.settings_by_user WHERE email='${req.query.user}';`)).rows[0]);
                
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

            default:
                console.log(`Error whilst getting a users settings: ${error}`);
                res.status(400).json(`Bad Request`);
        }
    }
}
