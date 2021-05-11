
// This will check if user should remain signed in
export function isAuthenticated() {
    if (isLoggedIn()) {
        let hoursPassed = getHoursPassed();
        // Keeps users logged in for 24 hours
        if (hoursPassed < 24) {
            return true;
        }
        else {
            signout()
        }
    } 
    return false;
}

export function printStorage() {
    // let keys = Object.keys(localStorage)
    // let i = keys.length;

    // while ( i-- ) {
    //     console.log(keys[i] + ": " + localStorage.getItem(keys[i]));
    // }
    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push( key + '=' + localStorage.getItem(key));
    }
    console.log(archive)

}

// Checks if current value of isLoggedIn in localStorage is true
export function isLoggedIn() {
    if (localStorage.hasOwnProperty("isLoggedIn") && (localStorage.getItem("isLoggedIn") === 'true')) {
        return true;
    } 
    return false;
}
// Return the number of hours since the user last logged in
export function getHoursPassed() {
	let hours = 0;
	if (localStorage.hasOwnProperty("isLoggedIn") && localStorage.hasOwnProperty("time")){
		const currentTime = new Date();
		let getStartTime = localStorage.getItem("time");
		let startTime = new Date(getStartTime);
		const diff = Math.abs(currentTime - startTime)
		hours = Math.ceil(diff / (1000 * 60 * 60));
	}
	return hours;
}

export function signout(){
    localStorage.setItem("isLoggedIn", 'false')
    localStorage.removeItem("email");
    localStorage.removeItem("site");
    localStorage.removeItem("time");
    localStorage.removeItem("week");
    localStorage.removeItem("token");
    localStorage.removeItem("volunteerID");
    localStorage.removeItem("userType");
}

export function hasPermission(requiredUser){
    console.log(requiredUser)
    if (requiredUser === "none")
    {
        return true;
    }
    return localStorage.getItem("userType") === requiredUser
}