import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "../layout";
import data from "../data.js";

import "./sells.scss";

class Sells extends React.Component {

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
      authenticated: false,
      editing: false,

    });
}

  render() {
    const sold_books = data; 

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
                      style={{ backgroundImage: `url(${book.image_url})` }}
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
                              <span className='d-flex justify-content-center'>Order status:{" "}</span>
                              {book.order_status === 'complete' ? (
                                  <span className="mb-4 text-success d-flex justify-content-center">Complete <CheckIcon/></span>
                              ) : book.order_status === 'delievering' ? (
                                  <span className="mb-4 text-danger d-flex justify-content-center">Delievering</span>
                              ) : ( <span className="mb-4 text-danger d-flex justify-content-center">Shipping</span> )
                              }
                               <div class="dropdown">
                                  <button class="btn btn-add dropdown-toggle mb-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Change Order Status
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#" value="pending">Shipping</a>
                                    <a class="dropdown-item" href="#" value="shipped">Delievering</a>
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