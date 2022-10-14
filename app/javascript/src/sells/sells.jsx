import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "../layout";
import data from "../data.js";
import Tooltip from "@material-ui/core/Tooltip";

import "./sells.scss";

class Sells extends React.Component {

  constructor(props) {
    super(props);
    this.state =   {
      sold_books: [],
      loading: true,
      authenticated: false,  
    };
      this.handleShipChange = this.handleShipChange.bind(this);
      this.handleDeliChange = this.handleDeliChange.bind(this);
    }
    
    handleShipChange(book) {
      book.order_status = 'Shipping';
      this.forceUpdate();
      //this.setState({ sold_books: this.state.sold_books });
    };
    
    handleDeliChange(book) {
      book.order_status = 'Delivering';
      this.forceUpdate();
      //this.setState({ sold_books: this.state.sold_books });
    }

    //fetch
  componentDidMount() {
    const sold_books = data; 

    this.setState({
      sold_books: sold_books,
      loading: false,
      authenticated: true
    });
  }
  

  render() {
    
    const {sold_books} = this.state; 

    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    console.log(sold_books);

    return (
      <Layout>
        <div className="container mybooks-container">
                    <div className="row">
                        <div className="col-4 mybooks-title">
                            <h4 className="mb-1">Sold Books</h4>
                        </div>
                    </div>
            {sold_books.length !== 0 ? (
              sold_books.map((book) => {
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
                          <b>Bought by: {book.buyer}</b>
                      </p>
                      </div>
                      <div className="col-8 col-lg-6 mb-4 d-grid for-sale-container">
                          <p className="for-sale rounded">
                          <p className="text-uppercase d-flex justify-content-center mt-4">
                          Amount: 
                          </p>
                          <span className='price-tag d-flex justify-content-center mb-4'>{book.price}$</span>
                              <span className='d-flex justify-content-center'>Order status: {" "}</span>
                              <span className="mb-4 text-danger d-flex justify-content-center">{book.order_status}</span>
                              {/* {book.order_status === 'complete' ? (
                                  <span className="mb-4 text-success d-flex justify-content-center">Complete <CheckIcon/></span>
                              ) : book.order_status === 'delievering' ? (
                                  <span className="mb-4 text-danger d-flex justify-content-center">Delivering</span>
                              ) : ( <span className="mb-4 text-danger d-flex justify-content-center">Shipping</span> )
                              } */}
                               <div className="dropdown">
                               <Tooltip title="Let the buyer know how is the order processing" placement="top">
                                  <button className="btn btn-add dropdown-toggle mb-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Change Order Status
                                  </button>
                                  </Tooltip>
                                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" role="button" value={book.order_status} onClick={() => this.handleShipChange(book)}>Shipping</a>
                                    <a className="dropdown-item" role="button" value={book.order_status} onClick={() => this.handleDeliChange(book)}>Delivering</a>
                                    <Tooltip title="Only the buyer can complete the order" placement="left">
                                      <span>
                                        <a className="dropdown-item disabled" role="button" aria-disabled="true" value={book.order_status}>Complete</a>
                                      </span>
                                    </Tooltip>
                                  </div>
                              </div>
                          </p>
                   </div>
                  </div>
              )
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

export default Sells;