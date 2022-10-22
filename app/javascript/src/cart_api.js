export function getCartFromServer() {
    // returns a Promise
    return fetch('/api/cart')
        .then(handleCartResponse);
}

export function addToCart(bookId) {
    // returns a Promise
    return fetch(`/api/cart/${bookId}`, { method: 'POST' })
        .then(handleCartResponse);
}

export function removeFromCart(bookId) {
    // returns a Promise
    return fetch(`/api/cart/${bookId}`, { method: 'DELETE' })
        .then(handleCartResponse);
}

export function emptyCart() {
    // returns a Promise
    return fetch('/api/cart', { method: 'DELETE' })
        .then(handleCartResponse);
}

function handleCartResponse(response) {
    if (!response.ok) {
        return Promise.resolve([]);
    }
    return response.json().then(getArrayOfBooks);
}

function getArrayOfBooks(data) {
    console.log("received cart from server:", data.cart);
    return Promise.resolve(data.cart);
}
