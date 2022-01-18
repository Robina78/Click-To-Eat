"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY ;
const PORT = process.env.PORT || 5000;
const BASE_YELP_URL = process.env.BASE_YELP_URL;
const YELP_API_KEY = process.env.YELP_API_KEY; 

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? process.env.DATABAS_TEST_URI
        : process.env.DATABASE_URI; 
}

//Speed up bcrypt during test, since the algorithm safety isn't being tested
//
//WJB: Evaluate in 2001 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" 
                        ? 1 
                        : process.env.BCRYPT_WORK_FACTOR;


module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,   
    getDatabaseUri,
    BASE_YELP_URL,
    YELP_API_KEY,
};