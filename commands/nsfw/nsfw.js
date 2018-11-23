const Command = require('../../struct/custom/Command');

class NSFWAccessCommand extends Command {
  constructor() {
    super('nsfw', {
      aliases: ['nsfw', 'nsfwaccess', 'access'],
	  category:'FUN',
      description: { content: 'Grants you access to marked `NSFW Channel` in this guild.' },
      clientPermissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
      channel: 'guild'
    });
  }

  async exec(message) {
    try {
      const guild = message.guild;
      const nsfwRole = this.client.guildSettings.get(guild.id, 'nsfwRoleID', null);
      const nsfwChannel = this.client.guildSettings.get(guild.id, 'nsfwChannelID', null);
      const resolvedChannel = guild.channels.get(nsfwChannel) || null;
      const prefix = this.handler.prefix(message);

      if (!nsfwRole || !resolvedChannel)
        return message.reply(
          'NSFW Role/Channel is not properly configured.' +
          `${message.author.id === message.guild.ownerID
            ? ` Please configure your NSFW Role/Channel via \`${prefix}nsfwchannel\` and/or \`${prefix}nsfwrole\``
            : ' Please contact the guild owner.'
          }`
        );
      const msg = await message.util.reply('requesting...');
      if (message.member.roles.has(nsfwRole)){
		  message.member.roles.remove(nsfwRole)
        return msg.edit(`${message.member},Removed access to all NSFW channels`);
	  }
	  
      await message.member.roles.add(nsfwRole);
      message.react('✅');

      return msg.edit(
        `${message.member}, granted! Proceed to ${resolvedChannel} if you wanne get nasty.`
      );
    } catch (err) {
      message.reply(`something went wrong: \`${err}\``);
    }
  }
}

module.exports = NSFWAccessCommand;
