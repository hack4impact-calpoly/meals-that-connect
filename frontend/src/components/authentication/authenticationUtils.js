
var jwt = require('jsonwebtoken');

// This will check if user should remain signed in
export function isAuthenticated() {
    let decoded = decodeToken()

    if (decoded && Date.now() < decoded.exp * 1000) {
        localStorage.setItem("site", decoded.site)
        localStorage.setItem("userType", decoded.user)
        localStorage.setItem("volunteerID", decoded.volunteerID)
        return true
    }
    signout()
    return false
}

export function printStorage() {
    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push( key + '=' + localStorage.getItem(key));
    }
    console.log(archive)

}

export function decodeToken() {
    let token = localStorage.getItem("token")
    if (!token) {
        return null
    }
    try{
        var decoded = jwt.verify(token, process.env.REACT_APP_TOKEN_SECRET);
        console.log(decoded)
    } catch(err){
        console.log(err)
    }
    return decoded
}

export function signout(){
    window.localStorage.clear();
}

export function hasPermission(requiredUsers){
    if (requiredUsers === "none")
    {
        return true;
    }
    let userType = localStorage.getItem("userType")
    return  requiredUsers.includes(userType)
}