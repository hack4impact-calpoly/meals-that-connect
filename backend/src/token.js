
var jwt = require("jsonwebtoken");
require('dotenv').config()

const decodeToken = function (token) {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded
}

const createToken = function (data) {
    var token = jwt.sign(
        data,
        process.env.TOKEN_SECRET,
        { expiresIn: "24h" }
    );
    return token
}

module.exports = {decodeToken, createToken}