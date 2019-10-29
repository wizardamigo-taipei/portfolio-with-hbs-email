var express = require('express')
var router = express.Router()
var nodeMailer = require('nodemailer')

router.get('/', function(req, res, next) {
  res.render('index', { layout: 'index', template: 'home-template' })
  // return res.sendFile(path.join(__dirname + '/views/index.html'))
})

router.post('/a', function(req, res, next) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: 'apikey',
      pass: 'asdf87A.yj_byI0knXB-kSgG8giGjrDylgdK3z4YRrOFbVo_x2E'
    }
  })
  let _email = req.body.email
  let _message = req.body.message
  let mailOptions = {
    // should be replaced with real recipient's account
    from: 'wizardamigos.codecamp@gmail.com',
    to: _email,
    subject: 'Test mail',
    text: ``, // plain text body
    html: `
      <h2> Dear ${req.body.name}, </h2>
      <h4> You are ready to go  </h4>
      <br>
      <div style="font-weight:bold; color: red;">
      MEssage: ${_message}
      <br>
      <div style="color:red;"> Just a test mail from sender ${_email}</div>
      <br>
      </div>
      </h4>`
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response)
  })
  res.writeHead(301, { Location: '/' })
  res.end()
})

module.exports = router
