"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
    NotFoundError,
    UnauthorizedError,
    BadRequestError,    
} = require("../expressError");
require("dotenv").config();

class User {
    /** authenticate user with username, password.
     * 
     * Returns { username, first_name, last_name, email, phone}
     * 
     * Throws UnauthorizedError if user not found or wrong password.
     */

    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    phone,
                    profile_photo AS "profilePhoto", 
                    is_admin AS "isAdmin"
            FROM users
            WHERE username =$1`, [username]);

        const user = result.rows[0];

        if (user) {
            //comapre hashed password to a new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register user with data.
     * 
     * Returns {username, firstName, lastName, email, phone, profilePhoto, isAdmin}
     * 
     * Throw BadRequestError on duplicates.
     */

    static async register(
        { username, password, firstName, lastName, email, phone}) {    
            
            const duplicateCheck = await db.query(
                `SELECT username
                 FROM users
                 WHERE username=$1`, 
                 [username]
            );
                    
            if (duplicateCheck.rows[0]) {
                throw new BadRequestError(`Duplicate username: ${username}`);
            }
            const hashedPassword = await bcrypt.hash(password, 10);            
            
            const result = await db.query(
                `INSERT INTO users (username,
                                    password,
                                    first_name,
                                    last_name,
                                    email,
                                    phone)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING username, first_name AS "firstName", last_name AS "lastName", email, phone`,
                [
                    username,
                    hashedPassword,
                    firstName,
                    lastName,
                    email,
                    phone,                         
                ],  
            );
                           
            const user = result.rows[0];
            return user;
        }

    /** Find all users.
    * 
    * Returns [{ username, first_name, last_name, email, phone,profile_phot }] 
    **/  
   
    static async findAll() {
        const result = await db.query(
            `SELECT username,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    phone, 
                    profile_photo AS "profilePhoto",
                    is_admin AS "isAdmin"
            FROM users
            ORDER BY username`,
        );

        return result.rows;
    }

    /** Given a username, return data about user.
     * 
     * Returns { username, first_name, last_name, email, phone, profile_photo, address }
     * where address is {id, street, city, state, zip_code}
     * 
     * Throws NotFoundError if user not found
    **/

    static async get(username) {
        const userRes = await db.query(
                `SELECT username,
                        first_name AS "firstName",
                        last_name AS "lastName",
                        email,
                        phone,
                        profile_photo AS "profilePhoto",
                        is_admin AS "isAdmin"
                FROM users
                WHERE username = $1`,
            [username],   
        );

        const user = userRes.rows[0];            
        if (!user) throw new NotFoundError(`No user: ${username}`);            
        return user;    
    }

    /**Update user data with `data`.
     * 
     * This is a "partial update" --- it's fine if data doesn't contain
     * all the fields; this only changes provided ones.
     * 
     * Data can include:
     *      { firstName, lastName, password, email, phone, profilePhoto }
     * 
     * Returns { username, firstName, lastName, email, phone, profilePhoto }
     * 
     * Throws NotFoundError if not found. 
     */

    static async update(username, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const {setCols, values } = sqlForPartialUpdate(
            data, 
            {
                firstName: "first_name",
                lastName: "last_name",
                profilePhoto: "profile_photo",
                isAdmin: "is_admin",
            }
        );
        const usernameVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE users
                          SET ${setCols}
                          WHERE username = ${usernameVarIdx}
                          RETURNING username,
                                    first_name AS "firstName",
                                    last_name AS "lastName",
                                    email,
                                    phone,
                                    profile_photo AS "profilePhoto",
                                    is_admin AS "isAdmin"`;
        const result = await db.query(querySql, [...values, username]);
        const user = result.rows[0];
        
        if (!user) throw new NotFoundError(`No user: ${username}`);
        
        delete user.password;
        return user;
    }

    
}

module.exports = User;