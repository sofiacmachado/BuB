import React from "react";
import { Layout } from "../layout";
import Tooltip from "@material-ui/core/Tooltip";
import { getSessionAndCart } from "../cart_api.js";
import { handleErrors } from "../utils/fetchHelper";

import "./sales.scss";

class Sales extends React.Component {
  constructor(props) {
    super(props);
    this.state =   {
      loading: true,
      orders: [],
      authenticated: false,  
      cart: [],
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
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

  handleStatusChange(order, status) {
    order.status = 'Shipping';
    this.forceUpdate();
    //this.setState({ sold_books: this.state.sold_books });
  }

  componentDidMount() {
    getSessionAndCart()
    .then(data => {
      this.setState({
        authenticated: data.authenticated,
        cart: data.cart,
      });
    });

    fetch('/api/orders')
    .then(handleErrors)
    .then(data => {
      this.setState({
        loading: false,
        orders: data.orders,
      });
    });
  }

  render() {    
    const {orders, cart, authenticated, loading } = this.state; 

    if (loading) {
      return <p>Loading...</p>;
    }
    return (
      <Layout cartItems={cart.length} authenticated={authenticated}>
        <div className="container mybooks-container">
          <div className="row">
            <div className="col-4 mybooks-title">
              <h4 className="mb-1">Sold Books</h4>
            </div>
          </div>
           {orders.length !== 0 ? (
            orders.map((order) => {
              return order.books.map((book) => {
              return (
                <div className="row mt-4 mb-4">
                  <div className="col col-lg-2 mb-4">
                    <div
                      className="book-image mb-3"
                      style={{ backgroundImage: `url(${order.book.image_url})` }}
                    />
                  </div>
                  <div className="col-8 col-lg-4 mb-4">
                    <h6 className="mb-2 text-uppercase">"{order.book.title}"</h6>
                    <p className="text-uppercase mb-1 text-secondary">
                      <small>
                        <b>{order.book.author}</b>
                      </small>
                    </p>
                    <p className="text-uppercase mb-4 text-secondary">
                      <small>
                        <b>ISBN: {order.book.isbn}</b>
                      </small>
                    </p>
                    <p className="text-uppercase mb-4 text-secondary">
                      <b>Bought by: {order.buyer}</b>
                    </p>
                  </div>
                  <div className="col-8 col-lg-6 mb-4 d-grid for-sale-container">
                    <p className="for-sale rounded">
                      <p className="text-uppercase d-flex justify-content-center mt-4">
                        Amount: 
                      </p>
                      <span className='price-tag d-flex justify-content-center mb-4'>{order.book.price}$</span>
                      <span className='d-flex justify-content-center'>Order status: {" "}</span>
                      <span className="mb-4 text-danger d-flex justify-content-center">
                        { book.order_status }
                      </span>
                      <div className="dropdown">
                        <Tooltip title="Let the buyer know how is the order processing" placement="top">
                          <button className="btn btn-add dropdown-toggle mb-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Change Order Status
                          </button>
                        </Tooltip>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a className="dropdown-item disabled" role="button" aria-disabled="true">Unpaid</a>
                          <a className="dropdown-item" role="button" onClick={() => this.handleStatusChange(order, 1)}>Shipping</a>
                          <a className="dropdown-item" role="button" onClick={() => this.handleStatusChange(order, 2)}>Shipped</a>
                          <a className="dropdown-item" role="button" onClick={() => this.handleStatusChange(order, 4)}>Cancelled</a>
                          <Tooltip title="Only the buyer can complete the order" placement="left">
                            <span>
                            <a className="dropdown-item disabled" role="button" aria-disabled="true">Received</a>
                            <a className="dropdown-item disabled" role="button" aria-disabled="true">Returned</a>
                            </span>
                          </Tooltip>
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
              <p>You haven't sold any books.</p>
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default Sales;