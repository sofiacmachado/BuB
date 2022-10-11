import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from '../layout';
import './cart.scss';
import data from "../data";
import { getCartFromServer, removeFromCart } from "../cart_api.js";

export class Cart extends React.Component {
    
    constructor(props) {
        super(props);
        this.onRemoveFromCart = this.onRemoveFromCart.bind(this);
        this.state =   {
            loading: true,
            authenticated: false,
            book: null,
            cart: [],
            }
          }
  
    //fetch
      componentDidMount() {
        const cart = getCartFromServer();
        const book = data;
  
        this.setState({
          loading: false,
          authenticated: false,
          book: book,
          cart: cart,
        });
      }

      onRemoveFromCart() {
        removeFromCart(this.state.book.id);
        const cart = getCartFromServer();
        this.setState({cart: cart});
      }

    render() {
        const cartBooks = data.filter((book) => this.state.cart.includes(book.id));
        const totalPrice = cartBooks.reduce((prev, book) => prev + book.price, 0);

        console.log('renderer')
            return (
                <Layout  cartItems={this.state.cart.length}>
                    <div className="container mybooks-container">
                        <div className="row">
                            <div className="col-4 mybooks-title">
                                <h4 className="mb-1">My Shopping Cart</h4>
                                {this.state.cart.length === 0 && 
                                <p className="text-secondary mb-3">
                                    Cart is empty
                                </p>}
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">

                                {cartBooks.map((item) => (
                                     <div key={item.id} className="latestbook text-body text-decoration-none">
                                     <div className="row mt-4 mb-4 row-item">
                                        <div className="col-2 col-lg-4">
                                            <div
                                            className="book-image my-3"
                                            style={{ backgroundImage: `url(${item.image_url})` }}
                                            />
                                        </div>
                                            <div className="col-4">
                                                <h6 className="mb-2 text-uppercase">"{item.title}"</h6>
                                                <p className="text-uppercase mb-1 text-secondary">
                                                    <small>
                                                    <b>{item.author}</b>
                                                    </small>
                                                </p>
                                            </div>
                                            <div className="col-2">
                                                <p className="price-tag">${item.price}
                                                </p>
                                            </div>
                                            <div className="col-2">
                                                <button onClick={this.onRemoveFromCart}  className="btn btn-edit remove">
                                                    x
                                                </button>
                                            </div>
                                    </div>
                                    </div>
                                        ))}
                                        {this.state.cart.length !== 0 && (
                                            <div className='checkout-row'>
                                                <div className="col-12 mt-4">
                                                    <p className="price-total">Total Price: ${totalPrice}</p>
                                                </div>
                                                <hr />
                                                <div className="col-12">
                                                    <button className="btn btn-add">
                                                        Checkout
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                        </div>
                    </div>
                </Layout>
            )
    }
}

document.addEventListener('DOMContentLoaded', () => {

    ReactDOM.render(
      <Cart />,
      document.body.appendChild(document.createElement('div')),
    )
  })