// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const settings = sequelizeClient.define('settings', {
    spin: {
      type: DataTypes.JSON,
      allowNull: true
    },
    rule: {
      type: DataTypes.JSON,
      allowNull: true
    },
    paidTable: {
      type: DataTypes.JSON,
      allowNull: true
    },
    chanceOfDisplayingItem: {
      type: DataTypes.JSON,
      allowNull: true
    },
    percentageForJackpot: {
      type: DataTypes.FLOAT,
      defaultValue: 0.01
    },
    percentageForDiamond: {
      type: DataTypes.FLOAT,
      defaultValue: 0.2
    },
    maximumOfFlame: {
      type: DataTypes.INTEGER,
      defaultValue: 20
    },
    chanceOfWinning: {
      type: DataTypes.FLOAT,
      defaultValue: 0.4
    },
    levelSetting: {
      type: DataTypes.JSON,
      allowNull: true
    },
    defaultCoin: {
      type: DataTypes.INTEGER,
      defaultValue: 10000
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  settings.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return settings;
};
