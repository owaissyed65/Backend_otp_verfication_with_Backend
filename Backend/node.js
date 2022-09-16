const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'owaissyed65@gmail.com',
        pass: 'wuydfqjocmjlephw'
    },
})

const mailOption = {
    from: 'iamowais@gmail.com',
    to: 'mbilal254.m@gmail.com',
    subject: 'Hello World',
    text: 'I am bilal',
     html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
    amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
        <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
        <p>GIF (requires "amp-anim" script in header):<br/>
          <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
      </body>
    </html>`
    
}

transport.sendMail(mailOption, (err, info) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(Boolean(info))
    }
})

