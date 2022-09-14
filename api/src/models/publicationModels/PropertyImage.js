const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('propertyImage', {
    url: {
      type: DataTypes.JSON,
 //     defaultValue: pegar url de default
    },
  });
};
// O descontruir el json que devuelve clodinary