// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const players = sequelizeClient.define('players', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    deviceId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    facebookId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    coin: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 10
    },
    diamond: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    jackPot: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    flame: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    freeSpin: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  players.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return players;
};
