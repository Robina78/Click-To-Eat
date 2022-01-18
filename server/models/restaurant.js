"use static";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Restaurant {
    /** Create a restaurant (from data), update db, return new restaurant data
     * 
     * data should be { name, category, rating, lat, long, description, username}
     */
    static async create(data) {        
        const result = await db.query(
                `INSERT INTO restaurants (username,
                                          name,
                                          category,
                                          rating,
                                          street,
                                          city,
                                          state, 
                                          zip_code,
                                          latitude,
                                          longitude)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING id, name, category, rating, street, city, state, zip_code As "zipCode", latitude, longitude, username`,
            [
                data.username,
                data.name,
                data.category,
                data.rating,                
                data.street,
                data.city,
                data.state, 
                data.zipCode, 
                data.latitude,
                data.longitude                              
            ]);       
        let restaurant = result.rows[0];
        return restaurant;        
    }

    static async findByName(searchFilter = {}) {
        let query = `SELECT id,                       
                        name, 
                        category,                   
                        rating,
                        street,
                        city,
                        state, 
                        zip_code AS "zipCode", 
                        username,
                        latitude,
                        longitude                                     
                    FROM restaurants`;
        let whereExpressions = [];
        let queryValues = [];            

        const { name } = searchFilter;
        
        if (name) {
            queryValues.push(`%${name}%`);
            whereExpressions.push(`name ILIKE $${queryValues.length}`);
        }

        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
          }
      
          // Finalize query and return results
      
          query += " ORDER BY name";
          const restaurantRes = await db.query(query, queryValues);
          return restaurantRes.rows;
    }

    static async getAll() {
        const restaurantRes = await db.query(
            `SELECT id,
                    name,
                    category,
                    rating,
                    street,
                    city,
                    state, 
                    zip_code AS "zipCode",
                    latitude,
                    longitude,                    
                    username                    
            FROM restaurants`);

        return restaurantRes.rows;  
    }        

    static async get(id) {
        const restaurantRes = await db.query(
            `SELECT id,
                    name,
                    category,
                    rating,
                    street,
                    city,
                    state, 
                    zip_code AS "zipCode",
                    latitude,
                    longitude,                    
                    username                    
            FROM restaurants
            WHERE id = $1`,
            [id]);

        const restaurant = restaurantRes.rows[0];       
       if(!restaurant) throw new NotFoundError(`No restaurant: ${id}`);        
        return restaurant;
    } 
    
    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                zipCode: "zip_code"
            });

        const VarIdx = "$" + (values.length + 1);
        const querySql = `UPDATE restaurants
                          SET ${setCols}
                          WHERE id = ${VarIdx}
                          RETURNING id,
                                    name,
                                    category,
                                    rating,
                                    street,
                                    city,
                                    state, 
                                    zip_code AS "zipCode",
                                    latitude,
                                    longitude`;
        const result = await db.query(querySql, [... values, id]);
        const restaurant = result.rows[0];
        
        if(!restaurant) throw new NotFoundError(`No restaurant: ${id}`);
        return restaurant;
    }

    /** Delete given restaurant from database; returns undefined.
   *
   * Throws NotFoundError if restaurant not found.
   **/

    static async remove(id) {
      const result = await db.query(
            `DELETE
             FROM restaurants
             WHERE id = $1
             RETURNING id`,
          [id]);
      const restaurant = result.rows[0];

      if (!restaurant) throw new NotFoundError(`No restaurant: ${id}`);
    }
}

module.exports = Restaurant;