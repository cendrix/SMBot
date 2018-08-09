const Discord = require('discord.js');
const express = require('express');
const app = express();

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client();
var pumpCountDown;
var countdownMessage;

// Set the date we're counting down to
var countDownDate = new Date("March 19, 2018 20:00:00").getTime();

// Update the count down every 60 seconds
var x = function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    pumpCountDown = days + "d " + hours + "h " + minutes + "m " + "left" + " until next pump. Exchange: **Cryptopia** | Pair: **BTC**";


    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        pumpCountDown = "Vote on skymoonsignal.com";
    }
    bot.user.setPresence({
        game: {
            name: pumpCountDown,
            type: 0
        }
    });

};



bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info(`Logged in as ${bot.user.tag}!`);
    setInterval(x, 500);
	bot.user.setStatus('dnd');
});


bot.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('You lagging? Get out before infecting us aswell.');
    }
	else if (msg.content === 'fuck you') {
		msg.reply('ffs. Mute? Kick? Ban? Tired of that. Here, will open my case. Come big boy. :eggplant:');
    }
    else if (msg.content === '!countdown'){
        var text = bot.user.presence.game.name;
        if (text !== "Vote on skymoonsignal.com") {
            countdownMessage = text.replace("d", " days").replace("h", " hours").replace("m", " minutes");
            msg.reply(countdownMessage);
        }
        else {
            msg.reply(text);
        }
    }
    else if (msg.content === '!info'){
        msg.reply('\nType **!countdown** to check if there is any pump scheduled.' + '\n' + 'Type **!invites** to check how many invites you have.');
    }
    else if (msg.content.substr(0, 6) === '..pump'){
        var length = msg.content.length
        var coin = msg.content.substr(7, length);
        bot.channels.get("425652411663908865").send('@here \n The coin is bold: /~~ADA~~ ..| ~~GVT~~^# | =ETC-- | **' + coin + '**-M | ~~XRP~~');
    }
});

client.login(process.env.BOT_TOKEN);

app.listen(7951, () => console.log('Countdown-bot listening on port 8200!'))
