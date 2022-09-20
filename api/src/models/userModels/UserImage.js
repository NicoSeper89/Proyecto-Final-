const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('userImage', {
    url: {
      type: DataTypes.STRING,
    },
    cloudId: {
      type: DataTypes.STRING,
    }
  });
};