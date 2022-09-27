const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('publicationComents', {

     message :{
        type: DataTypes.STRING,
     }, 
     publicationId: {
      type: DataTypes.UUID,
      // primaryKey: true,
  },
  });
};