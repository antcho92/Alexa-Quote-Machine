'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.ask.skill.8d1845f1-7aa2-4379-aa86-2337a6edc77d"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Quote Machine';


// Quotes module
var quotes = require('./quotes');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function() {
        this.emit('LaunchQuoteApp');
    },
    'GetNewFactQuote': function() {
        this.emit('GetQuote');
    },
    'LaunchQuoteApp': function() {
        var speechOutput = "Starting quote machine. Please ask for a quote.";
        this.emit(':tellWithCard', speechOutput);
    },
    'GetQuote': function() {
        // Get a random quote from the quotes list
        var quotesIndex = Math.floor(Math.random() * quotes.length);
        var randomQuote = quotes[quotesIndex];

        // Create speech output
        var speechOutput = "Here's a quote by: " + randomQuote['author'] + ":, " + randomQuote['quote'];

        this.emit(':tellWithCard', speechOutput, SKILL_NAME)
    },
    'AMAZON.HelpIntent': function() {
        var speechOutput = "You can say tell me a quote, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', 'Goodbye!');
    }
};
