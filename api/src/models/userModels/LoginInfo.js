const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('loginInfo', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
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