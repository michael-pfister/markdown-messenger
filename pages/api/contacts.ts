import cassandra from 'cassandra-driver';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

type Data = {};

export interface EnviromentVariables {
  [key: string]: string;
}

export type JwtPayload = {
  user: string,
  iat: EpochTimeStamp,
  exp: EpochTimeStamp
}

type ContactInformation = {
  email: string;
  latestMessage: string;
  settings: object;
}

const cassandraClient = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'markdown_messenger',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch(req.method){
    case 'GET':
      try{
        const jwtPayload = jwt.verify(req.cookies.JSON_WEB_TOKEN, (process.env as EnviromentVariables).JWTSECRET) as JwtPayload;
        let contacts: Array<ContactInformation> = [];

        for (const row of (await cassandraClient.execute(`SELECT contact FROM markdown_messenger.contacts_by_user WHERE email='${jwtPayload.user}';`)).rows){
          const latestMessageResult = (await cassandraClient.execute(`SELECT message FROM markdown_messenger.message_by_user WHERE email='${row.contact}' AND target='${jwtPayload.user}' LIMIT 1;`)).rows[0];
          contacts.push(
            {
              email: row.contact, 
              latestMessage: latestMessageResult ? latestMessageResult.message : '',
              settings: {}
            }
            );
        }

        for (const index in contacts){
          for (const row of (await cassandraClient.execute(`SELECT * FROM markdown_messenger.settings_by_user WHERE email='${contacts[index].email}';`)).rows){
            contacts[index].settings = { avatarURL: row.avatar_url, name: row.name, status: row.status };
          }
        }

        res.status(200).json(contacts);
      }catch(error: any){
        switch(error.message){
          case 'jwt expired':
            res.status(400).json(`Oops! Looks like your token expired. Please Log in.`);
            break;

          case 'jwt must be provided':
            res.status(400).json(`Oops! Looks like you don't have a token. Please Log in.`);
            break;

          default:
            console.log(`Error whilst getting a users contacts: ${error}`);
            res.status(400).json(`Bad Request`);
        }
      }

      break;
    default:
      res.status(405).json(`Method ${req.method} Not Allowed`);
  }
}
