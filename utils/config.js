const dotenv = require("dotenv");
dotenv.config();

const {SQL_DATABASE,SQL_HOSTNAME,SQL_PASSWORD,SQL_USERNAME,SQL_PORT,PORT,JWT_SECRET,SALT_ROUNDS} = process.env;
const config = {
    host: SQL_HOSTNAME,
    user: SQL_USERNAME,
    password: SQL_PASSWORD,
    database: SQL_DATABASE,
    port:SQL_PORT
};
const userSchema = `CREATE TABLE IF NOT EXISTS USERS(
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
)`;



module.exports = {config,userSchema,PORT,JWT_SECRET,SALT_ROUNDS};