import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class PostalCodes extends Model {}

PostalCodes.init(
    {
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    }, {
        sequelize,
        freezeTableName: true,
    });
  
export default PostalCodes;