"use strict";

const { italic } = require("colors");
const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Restaurant = require("./restaurant.js");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testRestaurantId,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */
describe("create", function () {
  const newRestaurant = {
    username: "u2",
    name: "newR1",
    category: "newc1",
    rating: "4.7",
    street: "25 maple",
    city: "ct2",
    state:"CA",
    zipCode:"93619", 
    latitude: null ,
    longitude: null,
  };

  test("works", async function () {
    let restaurant = await Restaurant.create(newRestaurant);    
    expect(restaurant).toEqual({
        ...newRestaurant,
        id: expect.any(Number)
    });
    
 });
});

/************************************** findAll */

describe("findByName", function () {
    test("works: no filter", async function () {
      let restaurants = await Restaurant.findByName();
      
      expect(restaurants).toEqual([
        {
          id: testRestaurantId[0],
          name: "Res1",         
          category: "c1",
          rating: 3,
          street: "154 main",
          city: "cit1",          
          state:"CA",
          zipCode:"93619",
          username:"u1"
        },
        {
            id: testRestaurantId[1],
            name: "Res2",         
            category: "c2",
            rating: 4.5,
            street: "164 main",
            city: "cit2",          
            state:"NY",
            zipCode:"78254",
            username:"u1"
        },
        {
            id: testRestaurantId[2],
            name: "Res3",         
            category: "c3",
            rating: 4,
            street: "28 main",
            city: "cit3",          
            state:"WA",
            zipCode:"93678",
            username:"u2"
        },       
      ]);
    });

    test("works: by name", async function () {
     
        let restaurants = await Restaurant.findByName({ name: "es2" });
        console.log(testRestaurantId[0])        
        expect(restaurants).toEqual(
          {
            id: testRestaurantId[1],
            name: "Res2",         
            category: "c2",
            rating: 4.5,
            street: "164 main",
            city: "cit2",          
            state:"Ny",
            zipCode:"78254",           
          },
        );
    });

    test("works: empty list on nothing found", async function () {
        let restaurants = await Restaurant.findByName({ name: "no" });
        expect(restaurants).toEqual([]);         
    });

    test("bad request if invalid filter", async function () {
        try {
          await Restaurant.findByName({ category: "c1" });
          fail();
        } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy();
        }
      });
}); 

/************************************** get */

describe("get", function () {
    test("works", async function () {
      let restaurant = await Restaurant.get(testRestaurantId[2]);
      expect(restaurant).toEqual({
        id: testRestaurantId[2],
        name: "Res3",         
        category: "c3",
        rating: 4,
        street: "28 main",
        city: "cit3",          
        state:"WA",
        zipCode:"93678",
        username:"u2"
      });
    });
  
    test("not found if no such restaurant", async function () {
      try {
        await Restaurant.get(0);
        fail();
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
});

