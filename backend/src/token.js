
var jwt = require("jsonwebtoken");

const decodeToken = function (token) {
    var decoded = jwt.verify(token, "secret-change-me");
    return decoded
}

module.exports = decodeToken