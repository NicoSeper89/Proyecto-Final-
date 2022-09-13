const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('TypeOfProp', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};