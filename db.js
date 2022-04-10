const Pool = require('pg').Pool
require('dotenv').config()


const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "root",
    port: "5432",
    database: "spark"
})

const devConfig = process.env.DATABASE_URL;
module.exports = new Pool({ connectionString: devConfig });