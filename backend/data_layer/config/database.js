import Sequelize from "sequelize";
import databaseConfig from "./db_config.js";

const sequelize = new Sequelize( databaseConfig.database, databaseConfig.username, databaseConfig.password,{
    host: databaseConfig.host,
    dialect: 'postgres'
});

sequelize.authenticate().then(()=>{
    console.log("Connection was successful");
}).catch((err)=>{
    console.log("error establishing to database");
});

export default sequelize;