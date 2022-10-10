var userCart = [];

export function getCartFromServer() {
    // here we are supposed to communicate with the server to update the cart
    const storedCart = localStorage.getItem("cart");
    if (storedCart == null) {
        // there is no cart in storage
        userCart = [];
    } else {
        // this should be an array of book ids
        userCart = JSON.parse(storedCart);
    }
    return userCart;
}

export function addToCart(bookId) {
    if (userCart.includes(bookId)) {
        alert('Cannot be added to the cart again');
    } else {
        userCart.push(bookId);
        updateCartOnServer();
        alert("Book added to the cart!");
    }
    console.log(userCart);
}

export function removeFromCart(bookId) {
    userCart = userCart.filter(book => book.id !== bookId);
    updateCartOnServer();
}

function updateCartOnServer() {
    // here we are supposed to communicate with the server to update the cart
    localStorage.setItem("cart", JSON.stringify(userCart));
}
