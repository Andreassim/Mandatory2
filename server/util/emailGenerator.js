import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount();
console.log(testAccount);

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

export function sendWelcomeMail(reciever){
    return new Promise(async (resolve, reject)=> {
        try {
            const mail = transporter.sendMail({
                from: `${testAccount.user}`, // sender address
                to: `${reciever.email}`, // list of receivers
                subject: "Welcome", // Subject line
                text: "Howdy Cowboy", // plain text body
                html: "<b>Howdy Cowboy</b>", // html body
            });
            resolve(mail);            

        } catch (err){
            reject("could not send email");
        }

    });
};