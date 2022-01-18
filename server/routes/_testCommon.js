"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const Restaurant = require("../models/restaurant.js");

const testRestaurantIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM restaurants");

  testRestaurantIds[0] = await Restaurant.create(
      {
        name: "Res1",
        category: "c1",
        rating: 4.5,
        street: "25 nees Ave",
        city: "Cit1",
        state: "CA",
        zipCode: "93720",
        username: "u1"
      });
 testRestaurantIds[1] = await Restaurant.create(
      {
        name: "Res2",
        category: "c2",
        rating: 4,
        street: "25 first Ave",
        city: "Cit2",
        state: "WA",
        zipCode: "93619",
        username: "u2"        
      });
 testRestaurantIds[2] = await Restaurant.create(
      {
        name: "Res3",
        category: "c3",
        rating: 3.5,
        street: "23 hill Ave",
        city: "Cit3",
        state: "NV",
        zipCode: "93720",
        username: "u3"
      });

  
  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    phone: "5595666987",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    phone: "4583692356",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    phone: "3659842563",
    isAdmin: false,
  });

  
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testRestaurantIds,
  u1Token,
  u2Token,
  adminToken,
};
