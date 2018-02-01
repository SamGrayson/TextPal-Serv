/** MessageController to create message */
var MessageController = require("./message.controller");
var notifier = require('mail-notifier');
var config = require('config');
var fs = require('fs');
var message = require('../models/message.model');
var messageTypes = require('../models/message-types');
var _ = require('lodash');

/** Parser */
// var simpleParser = require('mailparser').simpleParser;

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
};

var mailHandler = function(mail) {
  var newMessage = {
    type: null,
    type_code: null,
    message: null,
    createdBy: null,
    date: mail.date ? mail.date : null,
    active: true,
  };

  console.log(mail);

  // Parse 'from' for createdby
  if (mail.from) {
    newMessage.createdBy = parseNumber(mail.from[0].address);
  }

  // Check for text
  if (mail.text) {
    newMessage.message = mail.text;
  }
  // Check for attacthments (Verison sends text and .txt) THANKS VERIZON!
  if(mail.attachments) {
      mail.attachments.forEach(function(attachment){
        // Handle .txt attachment
        if (attachment.contentType === 'text/plain') {
          try {
            var textReturn = attachment.content.toString('utf8');
            newMessage.message = textReturn
          } catch (e) {
            throw Error('Unable to read .txt attachment: ', e);
          }
        }
        // Handle regular attachment (:TODO)
        
      });
  }

  console.log("I'm a new message!: ", newMessage)
};

var parseNumber = function(email) {
  var regx = /\d/g
  var leftSide = email.split('@')[0];
  return leftSide.match(regx) ? leftSide.match(regx).join('') : null;
};

// var determineType = function(message) {
//   var splitMessage = message.split(' ');
//   for (var i = 0; i<splitMessage.length; i++) {
//     if (messageTypes.map.
//   }
// };

const n = notifier(imap);
n.on('end', () => n.start()) // session closed
  .on('mail', mailHandler)
  .start();