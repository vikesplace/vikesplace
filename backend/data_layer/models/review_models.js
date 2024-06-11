import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Review extends Model {}

Review.init(
  {
    listing_review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reviewed_listing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "listings",
        key: "listing_id",
      },
      onDelete: "CASCADE",
    },
    review_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    review_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    listing_rating_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "ratings",
        key: "listing_rating_id",
      },
      onDelete: "CASCADE",
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