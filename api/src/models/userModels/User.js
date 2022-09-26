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
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    ratingAmount: {
      type: DataTypes.INTEGER,
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
};
