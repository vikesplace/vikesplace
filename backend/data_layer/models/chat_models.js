import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Chats extends Model {}

Chats.init(
    {
      chat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      listing_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Listings",
          key: "listing_id",
        },
        onDelete: "CASCADE",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id",
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
      freezeTableName: true,
      timestamps: false,
    }
);

export default Chats;