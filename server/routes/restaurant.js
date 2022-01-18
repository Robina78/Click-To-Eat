const express = require("express");
const router = new express.Router();
const { ensureLoggedIn } = require("../middleware/auth")
const Restaurant = require("../models/restaurant");


router.get("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const restaurant = await Restaurant.get(req.params.id);
        return res.json({ restaurant})
    } catch(err) {
        return next(err);
    }
});


router.get("/", async function (req, res, next) {
    const q = req.query;

    try {
        const restaurants = await Restaurant.findByName(q);
        return res.json({ restaurants });
    } catch(err) {
        return next(err)
    }
})


router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {        
        const { 
            username,
            name,
            category,
            rating,
            street,
            city,
            state, 
            zip_code,
            latitude,
            longitude,            
             } = req.body;

        const newRestaurant = await Restaurant.create(req.body);        
        return res.status(201).json(newRestaurant);
    } catch(err) {
        return next(err);
    }   
});

router.patch("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const restaurant = await Restaurant.update(req.params.id, req.body);
        return res.json({ restaurant }); 
    } catch(err) {
        return next(err);
    }
});

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        await Restaurant.remove(req.params.id);
        return res.json({ deleted: +req.params.id});
    } catch(err) {
        return next(err);
    }
})





module.exports = router;
