const Sequelize = require('sequelize');

const Database = new Sequelize(process.env.db, process.env.user, process.env.pass, {
    host: process.env.host,
    port: 3306,
    dialect: 'mysql',

  pool: {
    max: 10,
    min: 0,
    acquire: 30 * 1000
  },

  logging: false,
  omitNull: true,
  define: { freezeTableName: true },
  operatorsAliases: Sequelize.Op
  //storage: `${__dirname}/Eros.db`
});

module.exports = Database;
