const bcrypt = require("bcrypt");
const db = require("../db.js");
const BCRYPT_WORK_FACTOR = 1

const testRestaurantId = [];

async function commonBeforeAll() {
  jest.setTimeout(90 * 1000)
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM restaurants");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");


  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email, phone)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com', '5999827475'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com', '3564579821')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);
  const results = await db.query(`
    INSERT INTO restaurants(name, category, rating, street, city, state, zip_code, username)
    VALUES ('Res1', 'c1', 3,  '154 main', 'cit1','CA', '93720', 'u1'),
           ('Res2', 'c2', 4.5, '164 main', 'cit2','NY', '78254', 'u1'),
           ('Res3', 'c3', 4, '28 main', 'cit3','WA', '93678', 'u2')`);
  testRestaurantId.splice(0, 0, ... results.rows.map(r => r.id));  
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
  jest.setTimeout(30000);
}

async function commonAfterAll() {
  jest.setTimeout(30000)
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testRestaurantId,
};
