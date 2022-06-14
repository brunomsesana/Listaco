const pg = require('pg').Pool
const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const db = new pg({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
module.exports = db;