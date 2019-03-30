/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's conversation system.

In this example, Botkit hears a keyword, then asks a question. Different paths
through the conversation are chosen based on the user's response.

*/

module.exports = function(controller) {

    controller.hears(['Anon'], 'direct_message,direct_mention', function(bot, message) {

        bot.startConversation(message, function(err, convo) {

            convo.ask('What would you like to ask?', function(response, convo) {

                // Forwarding the message to a specific channel
                bot.say(
                    {
                    text: 'A student has a anonymous question: ' + response.text,
                      channel: 'CH5ET4YDN' // a valid slack channel, group, mpim, or im ID
                    },
                );
                 convo.next();

            });
        });

    });



    controller.hears(['ping'], 'direct_message,direct_mention', function(bot, message) {

        bot.startConversation(message, function(err, convo) {

            convo.ask("Should I ping the T.A's for you?", function(response, convo, err) {

                // Forwarding the message to a specific channel
                bot.say(
                    {
                    text: 'A user <@' + response.user + '> needs some assistance',
                    channel: 'CH5ET4YDN' // a valid slack channel, group, mpim, or im ID
                    },
                );
                convo.next();
                console.log(err);
                console.log('something worked yay');
            
            });
            
            

        });

    });

    // controller.hears(['run'], 'direct_message,direct_mention', function(bot, message) {

    //     bot.startConversation(message, function(err, convo) {

    

    //              // insert valid JSON following Block Kit specs

    //             const content = {
    //                 blocks: [{
    //                     "type": "divider"
    //                 },
    //                 {
    //                     "type": "section",
    //                     "text": {
    //                         "type": "mrkdwn",
    //                         "text": "A user <@" + response.user + ">"
    //                     },
    //                     "channel": CH5ET4YDN,
    //                     "accessory": {
    //                         "type": "button",
    //                         "text": {
    //                             "type": "plain_text",
    //                             "text": "Button",
    //                             "emoji": true
    //                         },
    //                         "value": "click_me_123"
    //                     }
    //                 }
    //             ]};
            
    //             bot.reply(message, content);
    //             convo.next();
    //     });
    // });



    controller.hears(['question'], 'direct_message,direct_mention', function(bot, message) {

        bot.createConversation(message, function(err, convo) {

            // create a path for when a user says YES
            convo.addMessage({
                    text: 'How wonderful.',
            },'yes_thread');

            // create a path for when a user says NO
            // mark the conversation as unsuccessful at the end
            convo.addMessage({
                text: 'Cheese! It is not for everyone.',
                action: 'stop', // this marks the converation as unsuccessful
            },'no_thread');

            // create a path where neither option was matched
            // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
            convo.addMessage({
                text: 'Sorry I did not understand. Say `yes` or `no`',
                action: 'default',
            },'bad_response');

            // Create a yes/no question in the default thread...
            convo.ask('Do you like cheese?', [
                {
                    pattern:  bot.utterances.yes,
                    callback: function(response, convo) {
                        convo.gotoThread('yes_thread');
                    },
                },
                {
                    pattern:  bot.utterances.no,
                    callback: function(response, convo) {
                        convo.gotoThread('no_thread');
                    },
                },
                {
                    default: true,
                    callback: function(response, convo) {
                        convo.gotoThread('bad_response');
                    },
                }
            ]);

            convo.activate();

            // capture the results of the conversation and see what happened...
            convo.on('end', function(convo) {

                if (convo.successful()) {
                    // this still works to send individual replies...
                    bot.reply(message, 'Let us eat some!');

                    // and now deliver cheese via tcp/ip...
                }

            });
        });

    });

};
