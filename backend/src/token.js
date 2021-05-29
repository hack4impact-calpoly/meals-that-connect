
var jwt = require("jsonwebtoken");
require('dotenv').config()

const decodeToken = function (token) {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded
}

module.exports = decodeToken