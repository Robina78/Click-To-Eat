"use strict";

const request = require("supertest");
const app = require("../app");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testRestaurantIds,
    u1Token,
    adminToken,
  } = require("./_testCommon");
  
  beforeAll(commonBeforeAll);
  beforeEach(commonBeforeEach);
  afterEach(commonAfterEach);
  afterAll(commonAfterAll);

/************************************** POST /companies */

describe("POST /restaurant", function () {
    const newRestaurant = {
        name: "newRes1",
        category: "newc1",
        rating: 4.5,
        street: "25 nees Ave",
        city: "newCit1",
        state: "CA",
        zipCode: "93720",
        username: "u1"
    };

    test("ok for admin", async function () {
        const resp = await request(app)
            .post("/restaurant")
            .send(newRestaurant)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
          restaurant: newRestaurant,
        });
    });

    test("unauth for non-admin", async function () {
        const resp = await request(app)
            .post("/restaurant")
            .send(newRestaurant)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });
    
    test("bad request with missing data", async function () {
        const resp = await request(app)
            .post("/restaurant")
            .send({
              name: "new",
              rating: 2,
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });
    
    test("bad request with invalid data", async function () {
        const resp = await request(app)
            .post("/restaurant")
            .send({
              ...newRestaurant,
              rating: "not a number",
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });
});

/************************************** GET /companies */

describe("GET /restaurant", function () {
    test("ok for anon", async function () {
      const resp = await request(app).get("/restaurant");
      expect(resp.body).toEqual({
        restaurants:
            [
              {
                name: "Res1",
                category: "c1",
                rating: 4.5,
                street: "25 nees Ave",
                city: "Cit1",
                state: "CA",
                zipCode: "93720",
                username: "u1"
              },
              {
                name: "Res2",
                category: "c2",
                rating: 4,
                street: "25 first Ave",
                city: "Cit2",
                state: "WA",
                zipCode: "93619",
                username: "u2",
              },
              {
                name: "Res3",
                category: "c3",
                rating: 3.5,
                street: "23 hill Ave",
                city: "Cit3",
                state: "NV",
                zipCode: "93720",
                username: "u3"
              },
            ],
      });
    });
  
    test("works: filtering", async function () {
      const resp = await request(app)
          .get("/restaurant")
          .query({ name: "Res3" });
      expect(resp.body).toEqual({
        restaurants: [
          {
            name: "Res3",
            category: "c3",
            rating: 3.5,
            street: "23 hill Ave",
            city: "Cit3",
            state: "NV",
            zipCode: "93720",
            username: "u3"
          },
        ],
      });
    });
   
    test("bad request if invalid filter key", async function () {
      const resp = await request(app)
          .get("/restaurant")
          .query({ nope: "nope" });
      expect(resp.statusCode).toEqual(400);
    });
});