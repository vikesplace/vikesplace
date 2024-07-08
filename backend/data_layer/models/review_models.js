import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Reviews extends Model {}

Reviews.init(
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
        model: "Listings",
        key: "listing_id",
      },
      onDelete: "CASCADE",
    },
    review_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "Users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    review_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "Ratings",
        key: "rating_id",
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

export default Reviews;