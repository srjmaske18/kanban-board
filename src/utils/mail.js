import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const  sendMail = async (options) => {
    
    const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      
        name: "Task Manager",
        link: 'https://mailgen.js/'
     
             }
    });

    const emailHtml = mailGenerator.generate(options.mailGenContect);

    const emailText = mailGenerator.generatePlaintext(options.mailGenContect);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMPT_HOST,
        port: process.env.MAILTRAP_SMPT_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
        user: MAILTRAP_SMPT_USER,
        pass: MAILTRAP_SMPT_PASSWORD,
             },
    });


    const mail = {
            from: "mail.taskmanager@example.com",
            to: options.email,
            subject: options.subject,
            text: emailText, // plain‑text body
            html: emailHtml, // HTML body
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email Failed", error)
    }

}


const emailVerificationMailGenContent = (username, verificationUrl) =>{
    return {
        body:{
            name:username,
            intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
            action: {
            instructions: 'To get started with Mailgen, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'verifiy your email',
                link: verificationUrl
              }
            },

            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}

const forgotPasswordMailGenContect = (username, passwordResetUrl) =>{
    return {
        body:{
            name:username,
            intro: 'We got request to reset your password',
            action: {
            instructions: 'To change your password , click below',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'forgot password',
                link: passwordResetUrl
              }
            },

            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}