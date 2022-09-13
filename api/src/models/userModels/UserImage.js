const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('userImg', {
    url: {
      type: DataTypes.JSON,
 //     defaultValue: pegar url de pp default
    },
  });
};
// O descontruir el json que devuelve clodinary