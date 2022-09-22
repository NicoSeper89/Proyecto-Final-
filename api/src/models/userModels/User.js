const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    
    name: {
      type: DataTypes.STRING,

      allowNull: true, 
      unique: true
    },
    description:{
      type:DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    rating:{
      type:DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  });
};
