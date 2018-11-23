const { ownerID, defaultPrefix } = require('../../auth');
const { DataTypes ,TEXT, BOOLEAN } = require('sequelize');
const db = require('../Database');

module.exports = db.define('guilds', {
  id: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true
  },
  name: TEXT,
  owner: TEXT,
  prefix: {
    type: DataTypes.STRING,
    defaultValue: defaultPrefix
  },
  twitterChannelID: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true
  },
  nsfwChannelID: DataTypes.STRING,
  nsfwRoleID: DataTypes.STRING,
  loli: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
});
