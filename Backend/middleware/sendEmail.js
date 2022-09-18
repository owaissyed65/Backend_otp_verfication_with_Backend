const nodemailer = require('nodemailer')

const sendEmail = (email, otp) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.user,
            pass: process.env.pass
        },
    })
    const mailOption = {
        from: process.env.user,
        to: `${email}`,
        subject: `Verification Code`,
        text: `Your Verification code `,
        html: `<h2>${otp}</h2>`,
    }
    transport.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(Boolean(info.response))
            return true
        }
    })
}
module.exports = sendEmail