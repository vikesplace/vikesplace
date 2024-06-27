import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database.js';

class Messages extends Model {}

Messages.init(
    {
      message_id: {
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
      message_content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Chats",
          key: "chat_id",
        },
        onDelete: "CASCADE",
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
      receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: false,
    }
);

export default Messages;