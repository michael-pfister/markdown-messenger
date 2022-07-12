import cassandra from 'cassandra-driver';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import sendMail from '../../../utilities/email-service';
import validator from 'email-validator';
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
                if (validator.validate(req.body.email)){
                    if(!(await cassandraClient.execute(
                        `SELECT email FROM markdown_messenger.credentials_by_user WHERE email='${req.body.email}'`
                    )).rowLength){
                        const verificationCode = Math.random().toString(36).substring(2);
                        const verificationCodeHash = await bcrypt.hash(verificationCode, 10);
                        const passwordHash = await bcrypt.hash(req.body.password, 10);
    
                        await sendMail(req.body.email, req.body.userName, verificationCode);
                        res.status(308).json(
                        {
                            JWT: jwt.sign(
                            { 
                                email: req.body.email,
                                userName: req.body.userName,
                                passwordHash: passwordHash,
                                verificationCodeHash: verificationCodeHash 
                            },
                            process.env.JWTSECRET,
                            { expiresIn: '15m' }),
    
                            redirect: `/verification/message?email=${req.body.email}`
                    });
                    }else{
                        res.status(400).json(`User ${req.body.email} Already Exists`);
                    }
                }else{
                    res.status(400).json(`Invalid Email ${req.body.email}`);
                }
            }catch(error){
                console.log(error);
                res.status(400).json(`Bad Request`);
            }
            
            break;
        
        default:
            return res.status(405).json(`Method ${req.method} Not Allowed`)
        }
}