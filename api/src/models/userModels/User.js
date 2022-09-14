const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    rating:{
      type:DataTypes.INTEGER,
      allowNull: true,
    }
  });
};
