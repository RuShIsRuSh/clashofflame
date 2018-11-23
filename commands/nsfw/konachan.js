const Command = require('../../struct/custom/Command');
const request = require('snekfetch');
const Discord = require('discord.js');
//const config = require('../../../config.json');
const booru = require('booru');
const errors = require('../../assets/json/errors');
class KonachanCommand extends Command {
	constructor() {
		super('konachan', {
            aliases: ['konachan','chan','sfwchan'],
            channelRestriction: 'guild',
            args: [{
                id: 'options',
                type: ['sfw']
            }],
			category:'FUN',
			description:{
			content:"Get pictures from my fav website | SFW",
			usage:['r!chan <tag>','r!chan loli']
		}
		});
	}
	getRating(rating) {
		if (rating === "s") return "Safe";
		if (rating === "q") return "Questionable";
		if (rating === "e") return "Explicit";
		if (rating === "u") return "Unrated";
	}
    exec(message, args) {
    var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
	var query = message.content.split(/\s+/g).slice(1).join(" ");
    if (!message.channel.nsfw) {
		//if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!');
        booru.search('knet', [query], { limit: 1, random: true })
            .then(booru.commonfy)
            .then(images => {
                for (let image of images) {
                    const embed = this.client.util.embed()
                        .setAuthor(`Konachan`, 'https://b.catgirlsare.sexy/NrAI.png')
                        .setDescription(`**Score**: ${image.common.score}\n**Rating**: ${this.getRating(image.common.rating)}\n**Tags**:\n\n\`${image.common.tags}\``)
                        .setImage(image.common.file_url)
						            .setFooter(`Requested by ${message.author.username}`)
                        .setColor('#E89F3E');
                    return message.util.send({ embed });
                }
            }).catch(err => {
                if (err.name === 'booruError') {
                    return message.channel.send(`No results found for **${query}**!`);
                } else {
                    return message.channel.send(`No results found for **${query}**!`);
                }
            })
		}
    }
}

module.exports = KonachanCommand;