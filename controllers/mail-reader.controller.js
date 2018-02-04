/** MessageController to create message */
var MessageController = require("./message.controller");
var notifier = require('mail-notifier');
var config = require('config');
var fs = require('fs');
var message = require('../models/message.model');
var moment = require('moment');
var htmlToText = require('html-to-text');

/** Message Utils */
var MessageUtils = require('../models/message-util');
var messageTypes = MessageUtils.messageTypes;
// REQUESTS
var getRequests = MessageUtils.getRequests;
var postRequests = MessageUtils.postRequests;
var updateRequests = MessageUtils.updateRequests;
var deleteRequests = MessageUtils.deleteRequests;
// NAMING
var calledSynonyms = MessageUtils.calledSynonyms;

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

/** Insert log4js to keep log an error in here properly instead of blowing up the app */
var requestHandler = function (mail) {
  try {
    mailHandler(mail);
  } catch(e) {
    console.log('There was an error handling email: ', e)
  }
}

var mailHandler = function(mail) {
  var newMessage = {
    type: null,
    type_code: null,
    message: null,
    name: null,
    createdBy: null,
    date: mail.date ? moment(mail.date).format("ddd, DD MMM YYYY HH:mm:ss ZZ") : moment().format("ddd, DD MMM YYYY HH:mm:ss ZZ"),
    active: true,
  };

  console.log(mail);

  // Parse 'from' for createdby
  if (mail.from) {
    try {
      newMessage.createdBy = parseNumber(mail.from[0].address);
    } catch (e) {
      throw Error('Unable to read number from message');
    }
  }

  // Check for text
  if (mail.html) {
    newMessage.message = htmlToText.fromString(mail.html, {
      wordwrap: 130
    });
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

  // Parse message to decide how to handle it 
  messageHandler(newMessage);
};

var parseNumber = function(email) {
  var regx = /\d/g
  var leftSide = email.split('@')[0];
  return leftSide.match(regx) ? leftSide.match(regx).join('') : null;
};

var messageHandler = function(newMessage) {

  if (newMessage.message) {
    var split = _.lowerCase(newMessage.message).split(' ');
    var pristineSplit = newMessage.message.split(' ');
  } else {
    throw Error("no message string")
  }
  var requestFound = false;
  var messageTypeFound = false;
  var namingFound = false;

  var request = "post";
  var requestIndex = null;

  var messageObj = null;

  /** Determine type of request first */
  /** Only look at max first 20 words for speed. (request and name should be found by then otherwise its a bogus message) */
  var loopLength = split.length<20 ? split.length : 20;
  for(var i=0;i<loopLength;i++) {
    /** post requets */
    if (_.indexOf(postRequests, split[i]) >= 0 && !requestFound) {
      request = "post";
      requestFound = true;
    }
    /** get requets */
    if (_.indexOf(getRequests, split[i]) >= 0 && !requestFound) {
      request = "get";
      requestFound = true;
    }
    /** delete requests */
    if (_.indexOf(deleteRequests, split[i]) >= 0 && !requestFound) {
      request = "delete";
      requestFound = true;
    }
    /** Add to list?? Remove from list?? (:TODO) */

    /** Try and get the type (should be next word otherwise not valid default to note) */
    // POST
    if (requestFound && !messageTypeFound && request==="post") {
      // Should be next word
      messageObj = messageTypes[split[i+1]] ? messageTypes[split[i+1]] : messageTypes['note'];
      // set message info
      newMessage.type = messageObj.name;
      newMessage.type_code = messageObj.code;
      newMessage.name = getNameFromMessage(split, 'post');
      namingFound = true;
      messageTypeFound = true;
    }
    // GET DELETE
    if (requestFound && !messageTypeFound && (request==="get" || request==="delete")) {
      var t = split.filter(function(s){
        return s==='list' || s==='reminder' || s==='note';
      })
      if (t.length === 0) {
        throw Error('Unable to find message type of request');
      } else {
        // Take first instance of found message type in string
        messageObj = messageTypes[t[0]];
      }
      newMessage.type = messageObj.name;
      newMessage.type_code = messageObj.code;
      newMessage.name = getNameFromMessage(split, 'get');
      namingFound = true;
      messageTypeFound = true;
    }
    if (requestFound && messageTypeFound && namingFound) {
      break;
    }
  }
  /** Get only the new message if post */
  if (request === 'post') {
    if (newMessage.name) {
      newMessage.message = extractMessage(split, pristineSplit, newMessage.name)
    } else {
      newMessage.message = extractMessage(split, pristineSplit, newMessage.type)
    }
  }
  console.log("I'm the new message!", newMessage);
}

/** Extract only message on post 
 * Find by taking the rest of the message AFTER either the name or the message type.
*/
extractMessage = function (split, pristineSplit, indexFinder) {
  var index = _.indexOf(split, indexFinder);
  var splitMessage = _.slice(pristineSplit, index+1, pristineSplit.length);
  return splitMessage.join(' ');
}

/** Extract name from message if its there */
getNameFromMessage = function(split, request) {
  var name = null;
  /** Return name that comes after a 'called' synonym */
  if (request === 'post') {
    var index = _.findIndex(split, function(n){
      return _.indexOf(calledSynonyms, n) > 0
    });
    if (index >=0 ) {
      name = split[index+1];
    }
  /** Return name that comes before a message type */
  } else if (request === 'get') {
    var index = _.findIndex(split, function(n){
      return _.indexOf(['reminder', 'note', 'list'], n) > 0
    });
    if (index >=0 ) {
      name = split[index-1];
    }
  };
  return name;
};

const n = notifier(imap);
n.on('end', () => n.start()) // session closed
  .on('mail', requestHandler)
  .start();