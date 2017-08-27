'use strict';

var Alexa = require('alexa-sdk');
var constants = require('./constants');
var stateHandlers = require('./stateHandlers');

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.appId = constants.appId;
    alexa.dynamoDBTableName = constants.dynamoDBTableName;
    alexa.registerHandlers(
        stateHandlers.newSessionHandler,
        stateHandlers.startModeIntentHandlers,
        stateHandlers.waiterModeIntentHandlers
    );
    alexa.execute();
};
