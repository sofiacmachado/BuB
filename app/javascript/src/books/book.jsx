import React from 'react';
import  { Layout } from '../layout';
import ReactDOM from 'react-dom';
import './book.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import data from "../data.js";
import { getCartFromServer, addToCart } from "../cart_api.js";

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.onAddToCart = this.onAddToCart.bind(this);
    this.state = {
      loading: false,
      authenticated: false,
      editing: false,
      book: null,
      cart: [],
    };
  }
  
  //fetch
  componentDidMount() {
    const cart = getCartFromServer();
    const url_parts = window.location.href.split('/');
    const url_id = +url_parts[url_parts.length - 1];
    const book = data.find(b => b.id === url_id);

    this.setState({
      loading: false,
      authenticated: false,
      editing: false,
      book: book,
      cart: cart,
    });
  }

  onAddToCart() {
    addToCart(this.state.book.id);
    const cart = getCartFromServer();
    this.setState({cart: cart});
  }

    render () {
      const url_parts = window.location.href.split('/');
      const url_id = +url_parts[url_parts.length - 1];
      const book = data.find(b => b.id === url_id);

        return (
            <Layout cartItems={this.state.cart.length}>
              <div className="container mybooks-container">
                  {this.editing === true ? (
                    <div className="row mt-4 mb-4">
                      <a href='#' className="">Change Image</a>
                      <div
                        className="book-image mb-3"
                        style={{ backgroundImage: `url(${book.image_url})` }}
                      />
                      <form className="col-12" /* onSubmit={this.updateBook} */>
                        <div className="row">
                          <div className="info col-12">
                            <div className="mb-3">
                              <label className="mb-1" htmlFor="inputTitle">Title</label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputTitle"
                                placeholder={book.title}
                                value={book.title}
                                //onChange={this.handleTitleChange}
                                maxLength="70"
                              />
                              <div className="form-row">
                                <div className="form-group col-md-6">
                                  <label className="mb-1" htmlFor="inputAuthor">Author</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputAuthor"
                                    placeholder={book.author}
                                    //onChange={this.handleCityChange}
                                    value={book.author}
                                    maxLength="200"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label className="mb-1" htmlFor="inputGenre">Genre</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputGenre"
                                    placeholder={book.genre}
                                    //onChange={this.handleGenreChange}
                                    value={book.genre}
                                    maxLength="200"
                                  />
                                  <div className="form-group col-md-6">
                                    <label className="mb-1" htmlFor="inputIsbn">ISBN</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="inputIsbn"
                                      placeholder={book.isbn}
                                      //onChange={this.handleIsbnChange}
                                      value={book.isbn}
                                      maxLength="200"
                                    />
                                  </div>
                                </div>
                              </div>
                              <p className="mb-0">
                                <small>
                                  Hosted by <b>{book.user.username}</b>
                                </small>
                              </p>
                            </div>
                            <div className="row">
                              <div className="col">
                                <p className="mb-0 text-capitalize">
                                  <label className="mb-1" htmlFor="inputCondition">
                                    Book Condition
                                  </label>
                                  <select
                                    id="inputCondition"
                                    className="form-control"
                                    //onChange={this.handleBookConditionChange}
                                    value={book.condition}
                                  >
                                    <option>New</option>
                                    <option>Used</option>
                                    <option>Collectible</option>
                                  </select>
                                </p>
                                <label className="mb-1" htmlFor="inputPrice">Price</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="inputPrice"
                                  placeholder={`$${book.price}`}
                                  //onChange={this.handlePriceChange}
                                  value={book.price}
                                  maxLength="200"
                                />
                              </div>
        
                              {this.authenticated == book.user &&
                              this.editing === false ? (
                                <div className="col-3">
                                  <button
                                    className="btn btn-outline-secondary"
                                  // onClick={((e) => e, this.editMode)}
                                  >
                                    Edit book
                                  </button>
                                </div>
                              ) : null}
                            </div>
                            <hr />
                            <p>
                              <label className="mb-1" htmlFor="inputDescription">Description</label>
                              <textarea
                                type="text"
                                className="form-control"
                                rows="10"
                                id="inputDescription"
                                placeholder={book.description}
                                //onChange={this.handleDescriptionChange}
                                value={book.description}
                                maxLength="2000"
                              />
                            </p>
                          </div>
        
                          <div className="col-11">
                            <button type="submit" className="btn btn-primary me-2">
                              Update book
                            </button>
                            <button className="btn btn-danger me-2"
                            // onClick={((e) => e, this.removeBook)}
                            >
                              Remove book
                            </button>
                            <button
                              className="btn btn-outline-secondary ms-2"
                            // onClick={((e) => e, this.cancelEdit)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>{" "}
                    </div>
                  ) : (
                    <div className="latestbook text-body text-decoration-none" key={book.id}>
                    <div className="row mt-4 mb-4">
                    <div className="col col-lg-2 mb-4">
                        <div
                        className="book-image mb-3"
                        style={{ backgroundImage: `url(${book.image_url})` }}
                        />
                    </div>
                        <div className="col-6 col-lg-2 mb-4">
                        <h6 className="mb-2 text-uppercase">"{book.title}"</h6>
                        <p className="text-uppercase mb-1 text-secondary">
                            <small>
                            <b>{book.author}</b>
                            </small>
                        </p>
                        <p className="text-uppercase mb-4 text-secondary">
                            <small>
                            <b>{book.genre}</b>
                            </small>
                        </p>
                        <p className="text-uppercase mb-4 text-secondary">
                            <small>
                            <b>ISBN: {book.isbn}</b>
                            </small>
                        </p>
                        <p className="text-uppercase mb-4 price-tag-title">
                            Price: <span className='price-tag'>{book.price}$</span></p>
                        <p>
                        </p>
                        </div>
                        <div className="col-8 col-lg-6 mb-4 third-column">
                        <small className="text-secondary">Book's condition:</small>
                        <p className="text-secondary condition">
                            {book.condition}
                        </p>
                        <small className="text-secondary">Detailed Condition:</small>
                        <p className="text-secondary condition">
                            {book.user_description}
                        </p>
                        <p className="mb-0 text-secondary">
                            {book.description}
                        </p>
                        </div>
                        <div className="col-4 col-lg-2 mb-4 d-grid for-sale-container">
                            <button
                            className="btn btn-edit mt-3" onClick={this.onAddToCart}>
                            <ShoppingCartIcon/> Add to Cart
                            </button>
                        {this.authenticated == book.user ? (
                          <div>
                            <p className="for-sale rounded">
                                {/* who's selling */}
                                For Sale
                            </p>
                            <button
                            className="btn btn-edit  mt-3"
                            //  onClick={((e) => e, this.editMode)}
                            >
                            Edit book
                            </button>
                          </div>
                        ) : null}
                    </div>
                    </div>
                </div>
                  )}
              </div>
            </Layout>
          );
        }
      }
      
      export default Book;