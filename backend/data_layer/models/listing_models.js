import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Listings extends Model {}

Listings.init(
  {
    listing_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    buyer_username: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
      references: {
        model: "Users",
        key: "username",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["AVAILABLE", "SOLD", "REMOVED"]],
      },
    },
    listed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    last_updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [["ELECTRONICS", "FURNITURE", "CLOTHING", "BOOKS", "OTHER"]],
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);

export default Listings;
