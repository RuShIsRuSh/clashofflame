const Command = require('../../struct/custom/Command');
const Discord = require('discord.js');
const request = require('snekfetch');

class HugCommand extends Command {
    constructor() {
        super("hug", {
            aliases: ["hug"],
            args: [
                {
                    id: "member",
                    type: "member",
                    default: message => message.member
                }
            ],
			category:'ACTIONS',
			description:{
			content:"Hug someone you're really into",
			usage:['r!hug @Example#1234','r!hug']
			}	
        });
    }

    async exec(message, { member }) {
		request.get('https://nekos.life/api/v2/img/hug').then(r => {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
		let body = r.body
        let hug = body.url;

        if (!recipient) {
            const embed = this.client.util.embed()
                .setColor('#FBCFCF')
                .setImage(hug);
            return message.channel.send(`You can't hug yourself, but I'll hug you, ${message.author}!`, { embed: embed });

        } else if (message.mentions.users.first() == message.author) {
            const embed = this.client.util.embed()
                .setColor('#FBCFCF')
                .setImage(hug);
            return message.channel.send(`You can't hug yourself, but I'll hug you, ${message.author}!`, { embed: embed });

        } else if (message.mentions.users.first() == this.client.user) {
            const embed = this.client.util.embed()
                .setColor('#FBCFCF')
                .setImage(hug);
            return message.channel.send(`ల(\*´= ◡ =｀\*) Such a warm hug..thank you~~ Nyaa~~`, { embed: embed });

        } else {
            const embed = this.client.util.embed()
                .setColor('#FBCFCF')
                .setImage(hug);
            return message.channel.send(`${message.author} hugs ${recipient}!`, { embed: embed });
        }
    })
	}
}
module.exports = HugCommand;