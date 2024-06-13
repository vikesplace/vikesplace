import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Ratings extends Model {}

Ratings.init(
  {
    listing_rating_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rated_listing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "listings",
        key: "listing_id",
      },
      onDelete: "CASCADE",
    },
    rating_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    rating_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

export default Ratings;
  