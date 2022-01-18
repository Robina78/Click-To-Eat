const app = require("./app");
const { PORT } = require("./config");

// socket = io.listen(process.env.PORT);

app.listen(PORT, function () {
    console.log(`Started on http://localhost:${PORT}`)
});