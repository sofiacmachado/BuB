export function isLoggedIn() {
    const authenticated = localStorage.getItem("authenticated");
    if (authenticated === "true") {
        return true;
    } else {
        return false;
    };
}

export function doLogIn(email, pass) {
    localStorage.setItem("authenticated", "true");
}

export function doLogOut() {
// here we are supposed to communicate with the server to update the session
    localStorage.setItem("authenticated", "false");
}