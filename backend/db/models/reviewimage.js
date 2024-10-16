"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      ReviewImage.belongsTo(models.Review, {
        foreignKey: "reviewId",
      });
    }
  }
  ReviewImage.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 550],
        },
      },
    },
    {
      sequelize,
      modelName: "ReviewImage",
    }
  );
  return ReviewImage;
};
