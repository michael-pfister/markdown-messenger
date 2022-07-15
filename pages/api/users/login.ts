import cassandra from 'cassandra-driver';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
var jwt = require('jsonwebtoken');

const cassandraClient = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'markdown_messenger',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    switch(req.method){
        case 'POST':
            try{
                const databaseResultSet = await cassandraClient.execute(`
                SELECT password_hash FROM markdown_messenger.credentials_by_user 
                WHERE email='${req.body.email}';
                `);

                if (databaseResultSet.rowLength){
                    await bcrypt.compare(req.body.password, databaseResultSet.rows[0].password_hash) ? res.status(200).json(jwt.sign({ user: req.body.email }, process.env.JWTSECRET, { expiresIn: '1h' })) : res.status(400).json('Email or Password Invalid');
                }else{
                    res.status(400).json('Email or Password Invalid');
                }
            }catch(error){
                console.log(`Error during login: ${error}`);
                res.status(400).json('Bad Request');
            }

            break;
        
        default:
            res.status(405).json(`Method ${req.method} Not Allowed`)
        }
}
