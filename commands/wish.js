const Discord = require('discord.js');
const fs = require('fs');
const cooldown = new Set();
const client = new Discord.Client({disableEveryone: true});
client.on('message', msg => {
    if (msg.channel.id === '695369849651855461') {
  module.exports.run = async (client, msg, args, config) => {
    if(cooldown.has(msg.author.id)) {
        msg.reply(`You need to wait ${config.COOLDOWN} minutes to use this command again!`)
            .then((m) => {
                msg.delete();

                setTimeout(() => {
                    m.delete();
                }, 5000);
            });
    } else {
        fs.readFile('./accounts/cc.txt', 'utf8', function(err, data) {
            if (err) throw err;

            data = data + '';
            var lines = data.split('\n');
            let account = lines[Math.floor(Math.random() * 1)];

            fs.writeFile('./accounts/cc.txt', lines.slice(1).join('\n'), function(err) {
                if(err) throw err;
            });

            let embed = new Discord.RichEmbed()
            .addField('Credit Card', `Random Credit Card (Card Number): \n**${account}**`)
            .setThumbnail('https://imgur.com/a/Jgm3rTB')
            .setColor('#FFFFFF')
            .setFooter('Bot made by Osiris')
            .setTimestamp();

            msg.author.send(embed);

            let dmembed = new Discord.RichEmbed()
            .setTitle("Credit Card Successfully Generated!")
            .setDescription("Check your DM for the account details!")
            .setColor("#15bfe6")
            .setThumbnail("http://www.compartosanita.it/wp-content/uploads/2019/02/right.png")
            .setFooter("Thank You For Using Free Generator.")
            .setTimestamp();
             
                msg.channel.send(dmembed)
                .then(m => {
                    setTimeout(() => {
                        m.delete();
                    }, 5000);
                });

            cooldown.add(msg.author.id);
            setTimeout(() => {
                cooldown.delete(msg.author.id);
            }, config.COOLDOWN * 60 * 1000);
        });
    }
};
    }
});

module.exports.help = {
    name: `cc`,
    description: `Sends you a Credit Card!`
};