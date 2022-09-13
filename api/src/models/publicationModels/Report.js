const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('report', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};