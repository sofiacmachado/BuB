import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './layout';
import './cart.scss';
import data from "./data.js";

class Cart extends React.Component {
    
    constructor(props) {
        super(props);
        this.state =   {
            loading: true,
            authenticated: false,
            editing: false,
            }
          }
  
    //fetch
      componentDidMount() {
  
        this.setState({
          loading: false,
          authenticated: false
  
        });
      }

    render() {
        const [cartItems, setCartItems] = useState([data]);
        
        const totalPrice = cartItems.reduce((totalPrice, item) => totalPrice + item.price, 0);

            return (
                <Layout>
                    <div className="container mybooks-container">
                        <div className="row">
                            <div className="col-4 mybooks-title">
                                <h4 className="mb-1">My Shopping Cart</h4>
                                {cartItems.length === 0 && 
                                <p className="text-secondary mb-3">
                                    Cart is empty
                                </p>}
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">

                                {cartItems.map((item) => (
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
                                                <button onClick={() => onRemove(item)}  className="btn btn-edit remove">
                                                    x
                                                </button>
                                            </div>
                                    </div>
                                    </div>
                                        ))}
                                        {cartItems.length !== 0 && (
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

export default Cart;