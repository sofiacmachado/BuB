import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './layout';
import "./orders.scss";
import { getSessionAndCart } from "./cart_api.js";
import { handleErrors } from "./utils/fetchHelper";

import Tooltip from "@material-ui/core/Tooltip";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state =   {
      cart: [],
      loading: true,
      authenticated: false,
      orders: [],
      open: false,
    }
    
     this.handleCompleteChange = this.handleCompleteChange.bind(this);
     this.handleClickOpen = this.handleClickOpen.bind(this);
     this.handleClose = this.handleClose.bind(this);

    }
    handleCompleteChange(book) {
      book.order_status = 'Complete';
      this.forceUpdate();
      //this.setState({ sold_books: this.state.sold_books }); */
    }
    
    handleClickOpen = () => {
       this.state.open = true;
     };
   
     handleClose = () => {
       this.state.open = false;
     };


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
    const { orders, cart, authenticated, open } = this.state; 

    if (this.state.loading) {
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
                              <span className="mb-4 text-danger d-flex justify-content-center">{book.order_status}</span>
                              <div className="dropdown">
                                  <Tooltip title="Tell the seller that your order has arrived" placement="top">
                                    <button className="btn btn-add dropdown-toggle mb-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      Change Order Status
                                    </button>
                                  </Tooltip>
                                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Tooltip title="Only the seller can change the status before completion" placement="left">
                                      <span>
                                        <a className="dropdown-item disabled" role="button" aria-disabled="true" value={book.order_status}>Shipping</a>
                                        </span>
                                    </Tooltip>
                                    <Tooltip title="Only the seller can change the status before completion" placement="left">
                                      <span>
                                        <a className="dropdown-item disabled" role="button" aria-disabled="true" value={book.order_status}>Delivering</a>
                                      </span>  
                                    </Tooltip>
                                    <Tooltip title="Select this state if you have received the order." placement="left">
                                      <span>
                                      <Button onClick={this.handleClickOpen}>
                                        <a className="dropdown-item" role="button" value={book.order_status} onClick={() => this.handleCompleteChange(book)}>Complete</a>
                                      </Button> 
                                        {/* <a className="dropdown-item" role="button" value={book.order_status} onClick={() => this.handleCompleteChange(book)}>Complete</a> */}
                                        <Dialog
                                          open={open}
                                          onClose={this.handleClose}
                                          aria-labelledby="alert-dialog-title"
                                          aria-describedby="alert-dialog-description"
                                        >
                                          <DialogTitle id="alert-dialog-title">
                                            {"Use Google's location service?"}
                                          </DialogTitle>
                                          <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                              Only set the order's state to "COMPLETE" if you already received it and everything is as you expected.
                                            </DialogContentText>
                                          </DialogContent>
                                          <DialogActions>
                                            <Button onClick={this.handleClose}>COMPLETE</Button>
                                            <Button onClick={this.handleClose} autoFocus>
                                              NOT COMPLETE
                                            </Button>
                                          </DialogActions>
                                        </Dialog>
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