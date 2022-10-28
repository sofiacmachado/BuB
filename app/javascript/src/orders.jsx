import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './layout';
import "./orders.scss";
import { getSessionAndCart } from "./cart_api.js";
import { handleErrors } from "./utils/fetchHelper";

import Tooltip from "@material-ui/core/Tooltip";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state =   {
      cart: [],
      loading: true,
      authenticated: false,
      orders: [],
    }
    
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.getOrderStatusString = this.getOrderStatusString.bind(this);
  }

  getOrderStatusString(status) {
    switch (status) {
      case 0: return 'Unpaid';
      case 1: return 'Shipping';
      case 2: return 'Shipped';
      case 3: return 'Received';
      case 4: return 'Cancelled';
      case 5: return 'Returned';
      default: return 'Unknown';
    }
  }
  
  handleStatusChange(book, status) {
    book.order_status =  this.getOrderStatusString(status);
    console.log(book.order_status);
    this.forceUpdate();
    //this.setState({ sold_books: this.state.sold_books });
  }

  componentDidMount() {
    getSessionAndCart()
    fetch(`/api/orders`)
    .then(handleErrors)
    .then(data => {
      this.setState({
        orders: data.orders,
        loading: false,
      });
    });
    getSessionAndCart()
    .then(data => {
      this.setState({
        authenticated: data.authenticated,
        cart: data.cart,
      });
    });
  }

  render() {
    const { orders, cart, authenticated, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }
    console.log(orders);

    return (
      <Layout cartItems={cart.length} authenticated={authenticated}>
        <div className="container mybooks-container">
                    <div className="row">
                        <div className="col-4 mybooks-title">
                            <h4 className="mb-1">Orders</h4>
                        </div>
                    </div>
            {orders.length !== 0 ? (
              orders.map((order) => {
              return order.books.map((book) => {
                return (
                <div  className="row mt-4 mb-4">
                  <div className="col col-lg-2 mb-4">
                      <div
                      className="book-image mb-3"
                      style={{ backgroundImage: `url(${book.image})` }}
                      />
                  </div>
                      <div className="col-8 col-lg-4 mb-4">
                      <h6 className="mb-2 text-uppercase">"{book.title}"</h6>
                      <p className="text-uppercase mb-1 text-secondary">
                          <small>
                          <b>{book.author}</b>
                          </small>
                      </p>
                      <p className="text-uppercase mb-4 text-secondary">
                          <small>
                          <b>ISBN: {book.isbn}</b>
                          </small>
                      </p>
                      <p className="text-uppercase mb-4 text-secondary">
                          <b>Sold by: {book.user}</b>
                      </p>
                      </div>
                      <div className="col-8 col-lg-6 mb-4 d-grid for-sale-container">
                          <p className="for-sale rounded">
                          <p className="text-uppercase d-flex justify-content-center mt-4">
                          Price: 
                          </p>
                          <span className='price-tag d-flex justify-content-center mb-4'>{book.price}$</span>
                              <span className='d-flex justify-content-center'>Order status:{" "}</span>
                              <span className="mb-4 text-danger d-flex justify-content-center">{ book.order_status }</span>
                              <div className="dropdown">
                                  <Tooltip title="Tell the seller that your order has arrived" placement="top">
                                    <button className="btn btn-add dropdown-toggle mb-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      Change Order Status
                                    </button>
                                  </Tooltip>
                                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Tooltip title="Only the seller can change to this status before completion" placement="left">
                                      <span>
                                        <a className="dropdown-item disabled" role="button" aria-disabled="true">Shipping</a>
                                        </span>
                                    </Tooltip>
                                    <Tooltip title="Only the seller can change to this status before completion" placement="left">
                                      <span>
                                        <a className="dropdown-item disabled" role="button" aria-disabled="true">Shipped</a>
                                      </span>  
                                    </Tooltip>
                                    <Tooltip title="Only the seller can change to this status before completion" placement="left">
                                      <span>
                                        <a className="dropdown-item disabled" role="button" aria-disabled="true">Cancelled</a>
                                        </span>
                                    </Tooltip>
                                      <span>
                                        <a className="dropdown-item" onClick={() => this.handleStatusChange(book, 3)}>Received</a>
                                      </span>
                                      <span>
                                        <a className="dropdown-item" onClick={() => this.handleStatusChange(book, 5)}>Returned</a>
                                      </span>
                                  </div>
                              </div>
                          </p>
                   </div>
                  </div>
                );
               });
            })
              ) : (
                <div className="col-12 my-4 ">
                    <p>You haven't bought any books.</p>
                  </div>
              )}
            </div>
      </Layout>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Orders />,
    document.body.appendChild(document.createElement("div"))
  );
});