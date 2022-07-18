import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const sendMail = async (targetEmailAddress:string, targetUserName: string, verificationCode: string) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAILADDRESS,
      pass: process.env.GMAILAPPPASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  let mailOptions = {
    from: `${process.env.GMAILADDRESS}`,
    to: `${targetEmailAddress}`,
    subject: `Your Email Verification Code`,
    html: `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>📨 email verification</title>
            <meta name="description" content="verification email" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body{
                    margin: 100px 0;
                    font-family: Arial, Helvetica, sans-serif;
                }
    
                body *{
                    margin: 20px 0;
                }
    
                h1{
                    font-weight: lighter;
                }
    
                button{
                    background-color: rgb(2, 123, 163);
                    padding: 10px;
                    border: none;
                    border-radius: 10px;
                    font-size: large;
                    color: white;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <center>
                <h1>📨</h1>
                <span>Hi ${targetUserName}!</span>
                <h1>Please verify your Email Address.</h1>
                <a href="https://markdown-messenger.herokuapp.com/verification?code=${verificationCode}" aria-label="verify your email account">
                    <button>
                        authorize
                    </button>
                </a>
            </center>
        </body>
    </html>`
  };
  
  transporter.sendMail(mailOptions, function (err) {
    err && console.log(`Error whilst sending an email: ${err}`);
  });
}

export default sendMail;