const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('publication', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'forRent',
        },
        premium: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

    });
};
