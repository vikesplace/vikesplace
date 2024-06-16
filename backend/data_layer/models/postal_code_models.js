import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class PostalCodes extends Model {}

PostalCodes.init(
    {
      postal_code: {
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
        timestamps: false,
        freezeTableName: true,
    });

//create table if it doesn't already exist, and delete it if it does
await PostalCodes.sync({force:true}); 
export default PostalCodes;