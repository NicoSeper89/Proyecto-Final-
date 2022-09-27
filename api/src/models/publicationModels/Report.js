const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('report', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    info: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /* user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, */
  });
};