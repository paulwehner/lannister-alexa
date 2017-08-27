'use strict';

var Alexa = require('alexa-sdk');
var _ = require('lodash');
var constants = require('./constants');
var getEther = require('./ethercall');

var stateHandlers = {
    newSessionHandler : {
        'LaunchRequest': function () {
            console.log('newSessionHandler --- LaunchRequest');
            this.handler.state = constants.states.START_MODE;
            var message = 'Welcome to Lannister. <break time="1s"/> Connecting to Etherium. <break time="1s"/> Connecting to Etherium. <break time="1s"/> Connecting to Etherium. <break time="1s"/> Connected! You can ask me for your status, make a payment, or request a new loan.';
            this.response.speak(message).listen('Would you like your status, make a payment or a loan?');
        },'AMAZON.HelpIntent': function () {
            console.log('newSessionHandler --- HelpIntent');
            this.handler.state = constants.states.START_MODE;
            this.emit(':tell', 'To change your Etherium address open the Amazon Alexa app.');
        },
        'Unhandled': function () {
            console.log('newSessionHandler --- Unhandled');
            this.handler.state = constants.states.START_MODE;
            this.emit(':tell', 'To change your Etherium address open the Amazon Alexa app.');
        }
    },
    startModeIntentHandlers : Alexa.CreateStateHandler(constants.states.START_MODE, {
        /*
         *  All Intent Handlers for state : START_MODE
         */
        'LaunchRequest' : function () {
            console.log('START_MODE --- LaunchRequest');
            var message = 'Welcome to Lannister! You can ask me for your status, make a payment, or request a new loan.'
            var reprompt = 'Would you like your status, make a payment or a loan?';
            this.handler.state = constants.states.START_MODE;
            this.emit(':saveState', true);
            this.response.speak(message).listen(reprompt);
            this.emit(':responseReady');
        },
        'Waiter' : function () {
            console.log('START_MODE --- Waiter');            
            this.handler.state = constants.states.START_MODE;
            var message = 'Would you like your status, make a payment or a loan?';
            var reprompt = 'Would you like your status, make a payment or a loan?';

            var etherData = getEther();
            console.log('etherData: ', etherData);

            if(this.event.request 
                && this.event.request.intent 
                && this.event.request.intent.slots 
                && this.event.request.intent.slots.Request
                && this.event.request.intent.slots.Request.value){

                var request = this.event.request.intent.slots.Request.value;

                console.log('Request: ', request);

                message = 'You have one outstanding loan, that is due in 30 days. <break time=".5s"/> Remember, a Lannister always pays his debts.';

                if(request == 'status'){

                }
                else if(request == 'payment'){
                    message = 'Your loan has been payed! No outstanding loans.';
                }
                else if(request == 'loan'){
                    message = 'You can borrow up to $23,000 based on your Ethereum assets. Go to www, dot, Lannister, dot, tech, to take out a loan.';
                }
            }
            this.response.speak(message);
            this.emit(':responseReady');
        },
        'AMAZON.HelpIntent' : function () {
            console.log('START_MODE --- HelpIntent');
            this.handler.state = constants.states.START_MODE;
            var message = 'You can ask for status, make a payment, or a loan.';
            this.response.speak(message).listen(message);
            this.emit(':responseReady');
        },
        'AMAZON.StopIntent' : function () {
            console.log('START_MODE --- StopIntent');
            var message = 'Good bye.';
            this.response.speak(message);
            this.emit(':responseReady');
        },
        'AMAZON.CancelIntent' : function () {
            console.log('START_MODE --- CancelIntent');
            var message = 'Good bye.';
            this.response.speak(message);
            this.emit(':responseReady');            
        },
        'AMAZON.StartOverIntent' : function () {
            console.log('START_MODE --- StartOverIntent');
            this.handler.state = constants.states.START_MODE;
            this.emit(':saveState', true);
            this.emitWithState("LaunchRequest");
        },
        'SessionEndedRequest' : function () {
            console.log('START_MODE --- SessionEndedRequest');
            // No session ended logic
        },
        'Unhandled' : function () {
            console.log('START_MODE --- Unhandled');
            var message = 'Sorry, I didn\'t understand that. You can ask for status, make a payment, or a loan?';
            this.response.speak(message).listen(message);
            this.emit(':responseReady');
        }
    }),
    waiterModeIntentHandlers : Alexa.CreateStateHandler(constants.states.WAITER_MODE, {
        /*
         *  All Intent Handlers for state : PLAY_MODE
         */
        'LaunchRequest' : function () {
            console.log('WAITER_MODE --- LaunchRequest');
            var message = 'You have one outstanding loan, that is due in 30 days. <break time="1s"/> Remember, a Lannister always pays his debts.';
            this.response.speak(message);
            this.handler.state = constants.states.START_MODE;
            this.emit(':responseReady');
        },
        'Waiter' : function () {
            console.log('WAITER_MODE --- Waiter');
            this.handler.state = constants.states.START_MODE;
            var message = 'You have one outstanding loan, that is due in 30 days. <break time="1s"/> Remember, a Lannister always pays his debts.';

            if(this.event.request 
                && this.event.request.intent 
                && this.event.request.intent.slots 
                && this.event.request.intent.slots.Request
                && this.event.request.intent.slots.Request.value){

                var request = this.event.request.intent.slots.Request.value;

                console.log('Request: ', request);

                if(request == 'status'){

                }
                else if(request == 'payment'){
                
                }
                else if(request == 'loan'){

                }
            }
            this.response.speak(message);
            this.emit(':responseReady');
        },   
        'AMAZON.YesIntent' : function () {
            console.log('WAITER_MODE --- YesIntent');
            var message = 'You have one outstanding loan, that is due in 30 days. Remember, a Lannister always pays his debts.';
            this.response.speak(message);
            this.emit(':responseReady');            
        },
        'AMAZON.NoIntent' : function () {
            console.log('WAITER_MODE --- NoIntent');
            var message = 'You have one outstanding loan, that is due in 30 days. Remember, a Lannister always pays his debts.';
            this.response.speak(message);
            this.emit(':responseReady');
        },             
        'AMAZON.HelpIntent' : function () {
            console.log('WAITER_MODE --- HelpIntent');
            var message = 'You have one outstanding loan, that is due in 30 days. Remember, a Lannister always pays his debts.';
            this.response.speak(message).listen(message);
            this.emit(':responseReady');
        },
        'AMAZON.StopIntent' : function () {
            console.log('WAITER_MODE --- StopIntent');
            var message = 'Okay, remember a Lannister always pays his debts.';
            this.response.speak(message);
            this.emit(':responseReady');
        },
        'AMAZON.CancelIntent' : function () {
            console.log('WAITER_MODE --- CancelIntent');
            this.handler.state = constants.states.START_MODE;
            var message = 'Okay, I\'m cancelling the request. Remember a Lannister always pays his debts.';
            this.response.speak(message).listen('Would you can ask for status, make a payment, or a loan?');
            this.emit(':responseReady');
        },
        'AMAZON.StartOverIntent' : function () {
            console.log('WAITER_MODE --- StartOverIntent');
            this.handler.state = constants.states.START_MODE;
            this.emit(':saveState', true);
            this.emitWithState("LaunchRequest");
        },
        'SessionEndedRequest' : function () {
            console.log('WAITER_MODE --- SessionEndedRequest');
            // No session ended logic
        },
        'Unhandled' : function () {
            console.log('WAITER_MODE --- Unhandled');
            this.handler.state = constants.states.START_MODE;
            var message = 'Sorry, I didn\'t understand that. You can ask for status, make a payment, or a loan?';
            this.response.speak(message).listen(message);
            this.emit(':responseReady');
        }
    })
};

module.exports = stateHandlers;