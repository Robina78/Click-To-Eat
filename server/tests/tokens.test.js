const jwt = require("jsonwebtoken");
const { createToken } = require("../helpers/tokens");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

describe('createToken', function () {
    test("works: not admin", function () {
        const token = createToken({ username: "test", isAdmin: false});
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test",
            isAdmin: false,
        });
    });

    test("works: admin", function () {
        const token = createToken({ username: "test", isAdmin: true });
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test",
            isAdmin: true,
        });
    });
    test("works: default no admin", function () {
        const token = createToken({ username: "test" });
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test",
            isAdmin: false,
        });
    });
});