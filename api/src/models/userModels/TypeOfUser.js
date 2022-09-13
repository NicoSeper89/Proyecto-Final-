const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('typeOfUser', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};