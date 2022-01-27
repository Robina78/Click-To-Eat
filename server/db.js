"use strict";
/** Database setup for click-to-eat */
const { Client } = require("pg");
require("dotenv").config();
let db;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? process.env.DATABAS_TEST_URI
        : process.env.DATABASE_URI; 
}

if(process.env.NODE_ENV === "production") {
    db = new Client({
        connectionString: getDatabaseUri(),
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    db = new Client({
        connectionString: getDatabaseUri()
    });
}

db.connect();

module.exports = db;