const { Listener } = require('discord-akairo');
const { status, error } = require('../../utils/console');
const { promisify } = require('util');
const request = require('snekfetch');
const fs = require('fs'); //For reading/writing to a file
const colour = new(require('chalk')).constructor({ //Used to make the console have pretty colours
        enabled: true //This isn't normally needed but PM2 doesn't work with chalk unless I do this
    });
//Make Promises faster and more efficent by using BlueBirds Implmentation of them
global.Promise = require('bluebird'),
//Console Log Colours
botC = colour.magenta.bold,
userC = colour.cyan.bold,
guildC = colour.black.bold,
channelC = colour.green.bold,
miscC = colour.blue.blue,
warningC = colour.yellow.red,
errorC = colour.red.bgred;
//const Twitter = require('../../functions/twitter');

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  exec() {
      const me = this.client.user;
      const guildSize = this.client.guilds.size;

      status(`Logged in as ${me.tag} (ID: ${me.id})`);
      me.setActivity(`@${me.username} help`, { type: 'STREAMING' });

      if (guildSize)
        status(`Listening to ${guildSize === 1
          ? this.client.guilds.first()
          : `${guildSize} Guilds`}`);
      else status('Standby Mode');
  console.log(`Current # of Commands Loaded: ${warningC(this.client.commandHandler.modules.size)}`)
      //this.client.getArticle = promisify(this.client.request.getArticle.bind(this.client.request));
      //this.client.getArticleCategories = promisify(this.client.request.getArticleCategories.bind(this.client.request));
      //this.client.getImageInfo = promisify(this.client.request.getImageInfo.bind(this.client.request));
	setInterval(() => {
    //Reads avatar directory and randomly picks an avatar to switch to
		request.get('https://nekos.life/api/v2/img/neko').then(r => {
        const bot = this.client.user;
		let body = r.body
        let hug = body.url;
		bot.setAvatar(hug)
        });
    },7.2e+6);
  }
}
setInterval(() => {
	ReadyListener
    },7.2e+6);
module.exports = ReadyListener;
