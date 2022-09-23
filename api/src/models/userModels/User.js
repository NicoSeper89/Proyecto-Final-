const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    
    name: {
      type: DataTypes.STRING, 
      allowNull: true, 
    },
    city:{
      type: DataTypes.STRING
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
    },
    ratingAmount:{
      type: DataTypes.INTEGER,
    }
  });
};
