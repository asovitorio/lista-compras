const path = require('path')
require('dotenv').config();
module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        },
        migrations: {
            tableName: 'migrations',
            directory: path.join("database", "migrations")
        },
        seeds: {
            tableName: 'seeds',
            directory: path.join("database", "seeds")
        },

    }

};