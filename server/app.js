"use strict";

const express = require('express');
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const apiRoutes = require('./routes/routeYelp');
const restaurantRoutes = require('./routes/restaurant');

const app = express();
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/restaurant", restaurantRoutes)


/** Handler 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler: anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});


//This will create a middleware.
//When you navigate to the root page, it would use the built react-app
app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


module.exports = app;