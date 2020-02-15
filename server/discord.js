const env = require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const appendLogs = require('./logs/appendLogs.js')

let loginAttempts = 3;

client.on('ready', () => {
    appendLogs('./server/logs/logs.txt',`Logged in as ${client.user.tag}!`);
});

client.on('disconnect', () => {
    loginAttempts--;
    if(loginAttempts > 0){
        client.login(process.env.discordToken).catch((err) => {
            appendLogs('./server/logs/logs.txt', 'Discord Bot Login Failed\n' + err)
        });
    }
})


client.on('error', () => {
    loginAttempts--;
    if(loginAttempts > 0){
        client.login(process.env.discordToken).catch((err) => {
            appendLogs('./server/logs/logs.txt', 'Discord Bot Login Failed\n' + err)
        });
    }
})

client.on('message', msg => {

    let content = msg.content.toLocaleLowerCase()
    let self = client.user.id
    
    if(msg.author.id != self){
        if(content.toLowerCase().includes("roku")){
            msg.channel.send(`It's good to see you, ${msg.author.username}. What took you so long?`)
        }

        else if(  msg.isMemberMentioned(client.user) ){
            msg.channel.send(`Listen carefully, Sozin's Comet will return by the end of this summer. ` + 
            `And Fire Lord Ozai will use its power to finish the war once and for all. ` + 
            `If he succeeds, even the Avatar won't be able to restore balance to the world. ` +
            `${msg.author.username}, you must defeat the Fire Lord before the comet arrives.`)
        }
    }

})

module.exports = {
    start: () => {
        client.login(process.env.discordToken).catch((err) => {
            appendLogs('./server/logs/logs.txt', 'Discord Bot Login Failed\n' + err)
        });
    }
}