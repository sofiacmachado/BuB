import { handleErrors } from './utils/fetchHelper';

export function getCartFromServer() {
    // returns a Promise
    return fetch('/api/cart')
        .then(handleErrors)
        .then(getArrayOfBooks);
}

export function addToCart(bookId) {
    // returns a Promise
    return fetch(`/api/cart/${bookId}`, { method: 'POST' })
        .then(handleErrors)
        .then(getArrayOfBooks);
}

export function removeFromCart(bookId) {
    // returns a Promise
    return fetch(`/api/cart/${bookId}`, { method: 'DELETE' })
        .then(handleErrors)
        .then(getArrayOfBooks);
}

export function emptyCart() {
    // returns a Promise
    return fetch('/api/cart', { method: 'DELETE' })
        .then(handleErrors);
}

function getArrayOfBooks(data) {
    return data.cart.books;
}
