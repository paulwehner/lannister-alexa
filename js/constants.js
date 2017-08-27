"use strict";

module.exports = Object.freeze({
    appId : 'amzn1.ask.skill.78585b16-b07c-415d-8edc-22d63f59489e', //prod
    
    //  DynamoDB Table name
    dynamoDBTableName : 'LannisterTable',
    
    /*
     *  States:
     *  START_MODE : Welcome state when the audio list has not begun.
     *  PLAY_MODE :  When a playlist is being played. Does not imply only active play.
     *               It remains in the state as long as the playlist is not finished.
     *  RESUME_DECISION_MODE : When a user invokes the skill in PLAY_MODE with a LaunchRequest,
     *                         the skill provides an option to resume from last position, or to start over the playlist.
     */
    states : {
        START_MODE : '_START_MODE',
        WAITER_MODE : '_WAITER_MODE'
    }
});
