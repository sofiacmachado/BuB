import { handleErrors, safeCredentials } from './utils/fetchHelper';

export function isLoggedIn() {
    // returns a Promise
    return fetch('/api/authenticated')
        .then(handleErrors);
}

export function doSignup(username, email, password) {
    return fetch('/api/users', safeCredentials({
        method: 'POST',
        body: JSON.stringify({
            user: {
                username: username,
                email: email,
                password: password,
            }
        })
    }))
        .then(handleErrors);
}

export function doLogIn(email, password) {
    return fetch('/api/sessions', safeCredentials({
        method: 'POST',
        body: JSON.stringify({
            user: {
                email: email,
                password: password,
            }
        }),
    }))
        .then(handleErrors);
}

export function doLogOut() {
    return fetch('/api/session', { method: 'DELETE' })
        .then(handleErrors);
}
