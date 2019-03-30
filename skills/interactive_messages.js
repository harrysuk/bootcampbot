module.exports = function(controller) {



    controller.hears(['homework', 'hw'],'direct_message,direct_mention,mention', function(bot, message) {

        var newhw = message.match[1];
        controller.storage.users.get(message.user, function(err, user) {
            
            var person = '<@' + message.user + '>';
            if (message.channel[0] == 'D') {
                person = 'You';
            }

            if (newhw =! NaN) {
                reply.attachments.push(
                    {
                        "payload": {
                            "channel": "CH10HC29J",
                            "token": process.env.bottoken,
                            "attachments": [
                                {
                                    "blocks": [
                                        [
                                            {
                                                "type": "section",
                                                "text": {
                                                    "type": "mrkdwn",
                                                    "text": "Here are your Homework Files"
                                                }
                                            },
                                            {
                                                "type": "divider"
                                            },
                                            {
                                                "type": "section",
                                                "text": {
                                                    "type": "mrkdwn",
                                                    "text": "*<https://columbia.bootcampcontent.com/columbia-bootcamp/COLNYC201809FSF2|GITLAB>*\nSelect which weeks Homework you would like"
                                                },
                                                "accessory": {
                                                    "type": "static_select",
                                                    "placeholder": {
                                                        "type": "plain_text",
                                                        "emoji": true,
                                                        "text": "HW Weeks"
                                                    },
                                                    "options": [
                                                        {
                                                            "text": {
                                                                "type": "plain_text",
                                                                "emoji": true,
                                                                "text": "week 1"
                                                            },
                                                            "value": "value-0"
                                                        },
                                                        {
                                                            "text": {
                                                                "type": "plain_text",
                                                                "emoji": true,
                                                                "text": "week 2"
                                                            },
                                                            "value": "value-1"
                                                        },
                                                        {
                                                            "text": {
                                                                "type": "plain_text",
                                                                "emoji": true,
                                                                "text": "week 3"
                                                            },
                                                            "value": "value-2"
                                                        },
                                                        {
                                                            "text": {
                                                                "type": "plain_text",
                                                                "emoji": true,
                                                                "text": "week 4"
                                                            },
                                                            "value": "value-3"
                                                        },
                                                        {
                                                            "text": {
                                                                "type": "plain_text",
                                                                "emoji": true,
                                                                "text": "week 5"
                                                            },
                                                            "value": "value-4"
                                                        },
                                                        {
                                                            "text": {
                                                                "type": "plain_text",
                                                                "emoji": true,
                                                                "text": "week 6"
                                                            },
                                                            "value": "value-5"
                                                        },
                                                        {
                                                            "text": {
                                                                "type": "plain_text",
                                                                "emoji": true,
                                                                "text": "week 7"
                                                            },
                                                            "value": "value-6"
                                                        },
                                                        {
                                                            "text": {
                                                                "type": "plain_text",
                                                                "emoji": true,
                                                                "text": "week 8"
                                                            },
                                                            "value": "value-7"
                                                        },
                                                        {
                                                            "text": {
                                                                "type": "plain_text",
                                                                "emoji": true,
                                                                "text": "week 9"
                                                            },
                                                            "value": "value-8"
                                                        },
                                                        {
                                                            "text": {
                                                                "type": "plain_text",
                                                                "emoji": true,
                                                                "text": "week 10"
                                                            },
                                                            "value": "value-9"
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "type": "divider"
                                            }
                                        ]
                                    ]
                                }
                            ]
                        }
                    }
                );
    
                bot.replyInteractive(message, reply);
            }

            user.tasks.push(newhw);

            controller.storage.users.save(user, function(err,saved) {

                if (err) {
                    bot.reply(message, 'I experienced an error adding your task: ' + err);
                } else {
                    bot.api.reactions.add({
                        name: 'thumbsup',
                        channel: message.channel,
                        timestamp: message.ts
                    });
                }

            });
        });

    });

    // create special handlers for certain actions in buttons
    // if the button action is 'say', act as if user said that thing
    controller.middleware.receive.use(function(bot, message, next) {
      if (message.type == 'interactive_message_callback') {
        if (message.actions[0].name.match(/^say$/)) {
            var reply = message.original_message;

            for (var a = 0; a < reply.attachments.length; a++) {
                reply.attachments[a].actions = null;
            }

            var person = '<@' + message.user + '>';
            if (message.channel[0] == 'D') {
                person = 'You';
            }

            reply.attachments.push(
                {
                    text: person + ' said, ' + message.actions[0].value,
                }
            );

            bot.replyInteractive(message, reply);
  
         }
      }
      
      next();    
      
    });





}
