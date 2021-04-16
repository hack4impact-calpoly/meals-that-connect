
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
    localStorage.removeItem("userEmail");
    localStorage.removeItem("site");
    localStorage.removeItem("time");
    localStorage.removeItem("userType");
}

export function hasPermission(requiredUser){
    if (requiredUser === "none")
    {
        return true;
    }
    return localStorage.getItem("userType") === requiredUser
}