const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: true, // el name no es unique
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    ratingAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userRank: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};
