// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },


  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  users.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
};

// Admin account
// admin@slotgame.vn
// 7e5270b8824311acdfd8995bb887acea
// 1 admin@slotgame.vn $2a$12$6P3TCCMFZ8hvucjcD67sLOu.4ZOGpWGXcGSd3Rwjc6jlLQA2InJFm 2017-11-30 09:03:55.058+00 2017-11-30 09:03:55.058+00
