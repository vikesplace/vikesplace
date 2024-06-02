require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DB_URL || getDbUrl()
};

function getDbUrl() {
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const database = process.env.DB_DATABASE;

    return `postgres://${user}:${password}@${host}:${port}/${database}`;
}