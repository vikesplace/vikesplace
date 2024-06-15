import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Search extends Model {}

Search.init( 
  {
    search_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    query: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    results: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false
  }
);

export default Search;
