import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount();
console.log(testAccount); //display login information in terminal

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

export function sendWelcomeMail(reciever){
    return new Promise(async (resolve, reject)=> {
        try {
            const mail = transporter.sendMail({
                from: `${testAccount.user}`,
                to: `${reciever.email}`, 
                subject: "Welcome",
                text: "Howdy Cowboy",
                html: "<b>Howdy Cowboy</b>",
            });
            resolve(mail);            

        } catch (err){
            reject("could not send email");
        }

    });
};