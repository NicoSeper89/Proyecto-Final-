const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('property', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        address: {
            type: DataTypes.STRING,
            defaultValue: false,
        },
        surface:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        environments: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bathrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        garage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        yard: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pets: {
            type: DataTypes.BOOLEAN,
            
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        propVideo:{
            type: DataTypes.TEXT
        }
    });
};