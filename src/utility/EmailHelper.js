const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    const transport = nodemailer.createTransport({
        host: "bmnazmussakib.com",
        port: 465,
        secure: true,
        auth: {
            user: "contact@bmnazmussakib.com",
            pass: "contact123456789"
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailOption = {
        from: "MERN Ecommerce Solution <contact@bmnazmussakib.com>",
        to: to,
        subject: subject,
        text: text
    }

    return await transport.sendMail(mailOption)
}

module.exports = {
    sendEmail
}