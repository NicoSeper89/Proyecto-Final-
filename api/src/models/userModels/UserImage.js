const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('userImage', {
    url: {
      type: DataTypes.JSON,
 //     defaultValue: pegar url de pp default
    },
  });
};
// O descontruir el json que devuelve clodinary