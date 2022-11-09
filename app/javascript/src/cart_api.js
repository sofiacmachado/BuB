import { isLoggedIn } from "./login_api";
import { handleErrors, safeCredentials } from "./utils/fetchHelper";

export function getCartFromServer() {
    // returns a Promise
    return fetch('/api/cart')
        .then(handleCartResponse);
}

export function getSessionAndCart() {
    // returns a Promise
    return isLoggedIn()
        .then(data => {
            if (data.authenticated) {
                return getCartFromServer()
                    .then(cart => {
                        return {
                            authenticated: true,
                            username: data.username,
                            cart: cart,
                        };
                    });
            } else {
                return {
                    authenticated: false,
                    cart: [],
                };
            }
        });
}

export function getDetailedCartFromServer() {
    // returns a Promise
    return fetch('/api/cart/details')
        .then(handleErrors);
}

export function addToCart(bookId) {
    // returns a Promise
    return fetch(`/api/cart/${bookId}`, safeCredentials({ method: 'POST' }))
        .then(handleCartResponse);
}

export function removeFromCart(bookId) {
    // returns a Promise
    return fetch(`/api/cart/${bookId}`, safeCredentials({ method: 'DELETE' }))
        .then(handleCartResponse);
}

export function emptyCart() {
    // returns a Promise
    return fetch('/api/cart', safeCredentials({ method: 'DELETE' }))
        .then(handleCartResponse);
}

function handleCartResponse(response) {
    if (!response.ok) {
        return Promise.resolve([]);
    }
    return response.json().then(getArrayOfBooks);
}

function getArrayOfBooks(data) {
    return Promise.resolve(data.cart);
}
