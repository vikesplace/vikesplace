import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Recommendations extends Model {}

Recommendations.init(
  {
    recommendation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recommending_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    recommended_listing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Listings",
        key: "listing_id",
      },
      onDelete: "CASCADE",
    },
    ignored: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false
  }
);

export default Recommendations;
  