const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('contactInfo', {
        mail: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:''
        },
        whatsapp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telegram: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        facebook: {
            type: DataTypes.STRING,
            allowNull: true,
        }     
    });
};