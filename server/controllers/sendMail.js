const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const isTrue = false;
const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND,
)

// send mail
const sendEmail = (email, url, txt, type) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken();

    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {      
            user: 'dtuconnections@gmail.com',
            pass: 'wumlmwgzcstpgsld',
            type: 'OAuth2',
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: email,
        subject: "Email verification from DTU Connections",
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to DTU Connections System.</h2>
            <p>Congratulations! You're almost set to start using this system.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `
    }
    const mailPassOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: email,
        subject: "Reset Password",
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the DTU Connections System.</h2>
            <p>Forgot your password?.</p>
            <p>We received a request the password for your account</p>
            <p>To reset your password, click on the button below</p>
            <a href=${url} style="background: blue; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `
    }
    if(type===1)
    {
        smtpTransport.sendMail(mailOptions, (err, infor) => {
            if(err) return console.log(err);
            else {
                return console.log("Email has been sent!", infor);
            }
        })
    }
    else if(type===2)
    {
        smtpTransport.sendMail(mailPassOptions, (err, infor) => {
            if(err) return console.log(err);
            else {
                return console.log("Email has been sent!", infor);
            }
        })
    }
    
}

module.exports = sendEmail;
