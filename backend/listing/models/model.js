const {Sequelize, DataTypes} = require('sequelize');
const database = require('../utils/database');

// Define the Listing model
const Listing = database.define('Listing', {
    listing_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id'
        },
        onDelete: 'CASCADE'
    },
    buyer_username: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'username'
        },
        onDelete: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['AVAILABLE', 'SOLD', 'REMOVED']]
        }
    },
    listed_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    last_updated_at: {  
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    hooks: {
        beforeCreate: (listing, options) => {
            listing.listed_at = new Date();
            listing.last_updated_at = new Date();
        },
        beforeUpdate: (listing, options) => {
            listing.last_updated_at = new Date();
        }
    }
});

// fetch 15 listings per page
exports.listingPagination = async (pull_limit, page_offset) => {
    const limit = pull_limit || 15;
    const offset = page_offset || 0;

    return await Listing.findAll({
        limit,
        offset
    });
};

module.exports = Listing;