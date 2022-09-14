const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('loginInfo', {
        
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        //Agregar info de google?
    });
};