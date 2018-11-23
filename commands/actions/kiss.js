//const { Command } = require('discord-akairo');
const Command = require('../../struct/custom/Command');
const request = require('snekfetch');
const Discord = require('discord.js');
//const config = require('../../../config.json');
class KissCommand extends Command {
    constructor() {
        super('kiss', {
            aliases: ['kiss'],
            channelRestriction: 'guild',
            args: [{
                id: 'input',
                type: 'string',
                match: 'rest'
            }],
          	category:'ACTIONS',
			      description:{
			        content:"Give that little lady (or golly gent) a peck for all of their hard work! <3",
			        usage:['r!kiss <tag>','r!kiss @Example#1324']
        }
        });
    }

    exec(message, args) {
        request.get('https://nekos.life/api/v2/img/kiss').then(r => {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
		let body = r.body
        let kiss = body.url;

        if (!recipient) {
            const embed = this.client.util.embed()
                .setColor('#FBCFCF')
                .setImage(kiss);
            return message.channel.send(`You can't kiss yourself, but I'll kiss you, ${message.author}!`, { embed: embed });

        } else if (message.mentions.users.first() == message.author) {
            const embed = this.client.util.embed()
                .setColor('#FBCFCF')
                .setImage(kiss);
            return message.channel.send(`You can't kiss yourself, but I'll kiss you, ${message.author}!`, { embed: embed });

        } else if (message.mentions.users.first() == this.client.user) {
            const embed = this.client.util.embed()
                .setColor('#FBCFCF')
                .setImage(kiss);
            return message.channel.send(`I-It's not like I wanted you to kiss me or anything...�:*(?�?�??)*:�`, { embed: embed });

        } else {
            const embed = this.client.util.embed()
                .setColor('#FBCFCF')
                .setImage(kiss)
                .setDescription(`${message.author} kisses ${recipient}!`);
          return message.channel.send(embed);
        }
	});
}
}

module.exports = KissCommand;