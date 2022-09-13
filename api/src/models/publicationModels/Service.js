const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('service', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};