const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('propertyVideo', {
    url: {
      type: DataTypes.STRING,
      unique: true
    },
  });
};