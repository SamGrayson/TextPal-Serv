/** MessageController to create message */
var MessageController = require("./message.controller")
var notifier = require('mail-notifier')
var config = require('config');

/** Config Mail */
var mailConfig = config.get('Mail')

/** Will want to move this into some sort of secure config */
var imap = {
  user: mailConfig.user,
  password: mailConfig.password,
  host: mailConfig.host,
  port: 993, // imap port
  tls: true,// use secure connection
  tlsOptions: { rejectUnauthorized: false }
}

var mailHandler = function(mail) {
    console.log(mail)
    console.log(mail.from[0].address)
}

const n = notifier(imap);
n.on('end', () => n.start()) // session closed
  .on('mail', mailHandler)
  .start();