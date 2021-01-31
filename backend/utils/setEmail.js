//npm install @sendgrid/mail --save
//^^do above to be able to use below line
//const sgMail = require('@sendgrid/mail');

//sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        sgMail.send(mailOptions, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });
}

module.exports = { sendEmail };
