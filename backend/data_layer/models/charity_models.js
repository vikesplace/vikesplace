import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Charity extends Model { }

Charity.init(
    {
        charity_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["OPEN", "CLOSED"]],
            },
        },
        fund: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        logo_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        num_listings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
    }
);

export default Charity;

