const Command = require('../../struct/custom/Command');
const snekfetch = require('snekfetch');
//const { imgurAPI } = require('../../../config.json');
//const nsfwSettings = require('../../models/NSFW');

class CosplayCommand extends Command {
  constructor() {
    super('cosplay', {
      aliases: ['cosplay','cp'],
      category: 'NSFW',
      cooldown: 5000,
      ratelimit: 2
    })
  }

  async exec(msg) {
    /*let guildSettings = await nsfwSettings.findOne({ where: { guildID: msg.guild.id } });
    if (!guildSettings) return;
    if (guildSettings.NSFW == false) return msg.reply('This guild doesn\'t allow NSFW commands.')*/
	const guild = msg.guild;
    let nsfwRole = this.client.guildSettings.get(guild.id, 'nsfwRoleID', null);
    let nsfwChannel = this.client.guildSettings.get(guild.id, 'nsfwChannelID', null);
	if (!nsfwChannel) return
	if (!nsfwRole) return msg.reply('You dont have the NSFW role, do r!nsfwaccess')
	if(!msg.channel.nsfw) return msg.reply(':underage: We gotta go someplace NSFW for this sorta thing.')
    var subreddits = [
      'nsfwcosplay',
      'Cosplayheels',
      'CosplayBoobs'
    ]

    var img_sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    try {
      var cosplay = await snekfetch.get(`https://api.imgur.com/3/gallery/r/${img_sub}`).set('authorization', 'Client-ID ' + process.env.imgurAPI).then(r => r.body)
    }
    catch(e) {
      return msg.channel.send('Something went wrong :cry:').then(console.log("oops"));
    }

    if(cosplay.status == 403) {
      return msg.channel.send('Something went wrong :cry:');
    }

    var i = Math.floor(Math.random() * cosplay.data.length)

    if(cosplay.data[i].is_album === true) {
      var cosplayPhoto = cosplay.data[i].images[0].link
    } else {
      var cosplayPhoto = cosplay.data[i].link
    }

    msg.channel.send({ embed: {
      title: `:eyes: ${msg.author.tag} decided to dress it up.`,
      color: 0xC71585,
      image: { url:cosplayPhoto }
    }})
  }
}

module.exports = CosplayCommand;
