import Sequelize from "sequelize";
import databaseConfig from "./db_config.js";

const sequelize = new Sequelize( databaseConfig.database, databaseConfig.username, databaseConfig.password,{
    host: databaseConfig.host,
    dialect: 'postgres'
});


export default sequelize;