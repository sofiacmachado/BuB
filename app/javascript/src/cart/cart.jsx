import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from '../layout';
import './cart.scss';
import { getDetailedCartFromServer, removeFromCart } from "../cart_api.js";
import { handleErrors, safeCredentials } from '../utils/fetchHelper';


export class Cart extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            authenticated: false,
            cart: [],
        };
        this.onRemoveFromCart = this.onRemoveFromCart.bind(this);
    }

    componentDidMount() {
        getDetailedCartFromServer()
        .then(data => {
            this.setState({
                authenticated: data.authenticated ? true : false,
                cart: data.cart,
                loading: false,
            });
        });
    }

    submitOrder = (e) => {
        if (e) { e.preventDefault(); }
    
        fetch(`/api/orders`, safeCredentials({ method: 'POST' ,}))
          .then(handleErrors)
          .then(response => {
            return this.initiateStripeCheckout(response.order.id);
          })
          .catch(error => {
            console.log(error);
          })
    };
  
    initiateStripeCheckout = (orderId) => {
        const apiUrl = `/api/charges?order_id=${orderId}&cancel_url=${window.location.pathname}`;
        const paymentCompleteCallback = this.onPaymentComplete;
        return fetch(apiUrl, safeCredentials({
            method: 'POST',
        }))
        .then(handleErrors)
        .then(response => {
            const stripe = Stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

            stripe.redirectToCheckout({
                // Make the id field from the Checkout Session creation API response
                // available to this file, so you can provide it as parameter here
                // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                sessionId: response.charge.checkout_session_id,
            }).then((result) => {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer
                // using `result.error.message`.
                if (result.error != null && result.error.message != null) {
                    alert(result.error.message);
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
    };

    onRemoveFromCart(bookId) {
        removeFromCart(bookId)
        .then(() => {
            return getDetailedCartFromServer();
        })
        .then(data => {
            this.setState({ cart: data.cart });
        });
    }

    render() {
        const { cart, authenticated } = this.state;
        const totalPrice = cart.reduce((prev, book) => prev + book.price, 0);

        if (cart.length == 0) {
            return (
                <Layout authenticated={authenticated}>
                    <div className="container mybooks-container">
                        <div className="row">
                            <div className="col-4 mybooks-title">
                                <h4 className="mb-1">My Shopping Cart</h4>
                                <p className="text-secondary mb-3">Your cart is empty.</p>
                                <p>Try <a href="/browse_title">browsing</a> some books first.</p>
                            </div>
                        </div>
                    </div>
                </Layout>
            );
        } else {
            return (
                <Layout cartItems={cart.length} authenticated={authenticated}>
                    <div className="container mybooks-container">
                        <div className="row">
                            <div className="col-4 mybooks-title">
                                <h4 className="mb-1">My Shopping Cart</h4>
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">
                            {cart.map((book) => (
                                <div key={book.id} className="latestbook text-body text-decoration-none">
                                    <div className="row mt-4 mb-4 row-item">
                                        <div className="col-2 col-lg-4">
                                            <div
                                                className="book-image my-3"
                                                style={{ backgroundImage: `url(${book.image})` }}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <h6 className="mb-2 text-uppercase">"{book.title}"</h6>
                                            <p className="text-uppercase mb-1 text-secondary">
                                                <small><b>{book.author}</b></small>
                                            </p>
                                        </div>
                                        <div className="col-2">
                                            <p className="price-tag">${book.price}</p>
                                        </div>
                                        <div className="col-2">
                                            <button onClick={() => this.onRemoveFromCart(book.id)} className="btn btn-edit remove">
                                                x
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='checkout-row'>
                                <div className="col-12 mt-4">
                                    <p className="price-total">Total Price: ${totalPrice}</p>
                                </div>
                                <hr />
                                <div className="col-12">
                                    <button onClick={this.submitOrder} className="btn btn-add">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            );
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    ReactDOM.render(
      <Cart />,
      document.body.appendChild(document.createElement('div')),
    )
  })