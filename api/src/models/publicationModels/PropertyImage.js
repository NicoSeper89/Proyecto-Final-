const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('propertyImage', {
    url: {
      type: DataTypes.STRING,
      unique: true
    },
    cloudId: {
      type: DataTypes.STRING,
    }
  });
};