import React from 'react';
import { Layout } from '../layout';
import ReactDOM from 'react-dom';
import './book.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const BOOKSTORE = [
  {
    id: 1,
    title: 'Anna Karenina',
    author: "Leo Tolstoy",
    isbn: '9780140449174',
    description: "Anna Karenina seems to have everything - beauty, wealth, popularity and an adored son. But she feels that her life is empty until the moment she encounters the impetuous officer Count Vronsky. Their subsequent affair scandalizes society and family alike and soon brings jealously and bitterness in its wake. Contrasting with this tale of love and self-destruction is the vividly observed story of Levin, a man striving to find contentment and a meaning to his life - and also a self-portrait of Tolstoy himself.",
    condition: "Used",
    user_description: 'Spine has some folds',
    genre: 'classic',
    price: 4,
    rating: 4.08/5,
    image_url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1426930853l/153.jpg',
    user: 1
  },
  {
    id: 2,
    title: 'Notes from Underground',
    author: "Fyodor Dostoevsky",
    isbn: '9780679734529',
    description: "Notes from Underground is a novella written in 1864 by Fyodor Dostoevsky, and is considered by many to be one of the first existentialist novels. The novella presents itself as an excerpt from the rambling memoirs of a bitter, isolated, unnamed narrator, who is a retired civil servant living in St. Petersburg.",
    condition: "Like new",
    user_description: 'Book is in perfect conditions',
    genre: 'classic',
    price: 8,
    rating: 4.2/5,
    image_url: 'https://images-na.ssl-images-amazon.com/images/I/41kxGhOH0vL._SX322_BO1,204,203,200_.jpg',
    user: 1
  }
]

class Book extends React.Component {


    constructor(props) {
        super(props);
        this.state =   {
          title: '',
          author: '',
          description: '',
          isbn: '',
          condition: '',
          user_description: '',
          genre: '',
          price: '',
          rating: '',
          image_url: '',
          user: '',
          loading: true,
          authenticated: false,
          editing: false,
          }
        }

  //fetch
      componentDidMount() {
        let data = {
          book:  BOOKSTORE[0],
        }

        this.setState({
          loading: false,

          author: data.book.author,
          title: data.book.title,
          description: data.book.description,
          user_description: data.book.user_description,
          condition: data.book.condition,
          genre: data.book.genre,
          price: data.book.price,
          isbn: data.book.isbn,
          rating: data.book.rating,
          image_url: data.book.image_url,
          user: data.book.user,
          loading: true,
          authenticated: false,
          editing: false,

        });
        //fetch
        data = true;
        this.setState({
          authenticated: data,
        });
  }

    render () {
      
        return (
            <Layout>
              <div className="container mybooks-container">
                  {this.state.editing === true ? (
                    <div className="row mt-4 mb-4">
                      <a href='#' className="">Change Image</a>
                      <div
                        className="book-image mb-3"
                        style={{ backgroundImage: `url(${this.state.image_url})` }}
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
                                placeholder={this.state.title}
                                value={this.state.title}
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
                                    placeholder={this.state.author}
                                    //onChange={this.handleCityChange}
                                    value={this.state.author}
                                    maxLength="200"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label className="mb-1" htmlFor="inputGenre">Genre</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputGenre"
                                    placeholder={this.state.genre}
                                    //onChange={this.handleGenreChange}
                                    value={this.state.genre}
                                    maxLength="200"
                                  />
                                  <div className="form-group col-md-6">
                                    <label className="mb-1" htmlFor="inputIsbn">ISBN</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="inputIsbn"
                                      placeholder={this.state.isbn}
                                      //onChange={this.handleIsbnChange}
                                      value={this.state.isbn}
                                      maxLength="200"
                                    />
                                  </div>
                                </div>
                              </div>
                              <p className="mb-0">
                                <small>
                                  Hosted by <b>{this.state.user.username}</b>
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
                                    value={this.state.condition}
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
                                  placeholder={`$${this.state.price}`}
                                  //onChange={this.handlePriceChange}
                                  value={this.state.price}
                                  maxLength="200"
                                />
                              </div>
        
                              {this.state.authenticated.username == this.state.user.username &&
                              this.state.editing === false ? (
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
                                placeholder={this.state.description}
                                //onChange={this.handleDescriptionChange}
                                value={this.state.description}
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
                    <div className="latestbook text-body text-decoration-none">
                    <div className="row mt-4 mb-4">
                    <div className="col col-lg-2 mb-4">
                        <div
                        className="book-image mb-3"
                        style={{ backgroundImage: `url(${this.state.image_url})` }}
                        />
                    </div>
                        <div className="col-6 col-lg-2 mb-4">
                        <h6 className="mb-2 text-uppercase">"{this.state.title}"</h6>
                        <p className="text-uppercase mb-1 text-secondary">
                            <small>
                            <b>{this.state.author}</b>
                            </small>
                        </p>
                        <p className="text-uppercase mb-4 text-secondary">
                            <small>
                            <b>{this.state.genre}</b>
                            </small>
                        </p>
                        <p className="text-uppercase mb-4 text-secondary">
                            <small>
                            <b>ISBN: {this.state.isbn}</b>
                            </small>
                        </p>
                        <p className="text-uppercase mb-4 price-tag-title">
                            Price: <span className='price-tag'>{this.state.price}$</span></p>
                        <p>
                        </p>
                        </div>
                        <div className="col-8 col-lg-6 mb-4 third-column">
                        <small className="text-secondary">Book's condition:</small>
                        <p className="text-secondary condition">
                            {this.state.condition}
                        </p>
                        <small className="text-secondary">Detailed Condition:</small>
                        <p className="text-secondary condition">
                            {this.state.user_description}
                        </p>
                        <p className="mb-0 text-secondary">
                            {this.state.description}
                        </p>
                        </div>
                        <div className="col-4 col-lg-2 mb-4 d-grid for-sale-container">
                            <button
                            className="btn btn-edit mt-3">
                            <ShoppingCartIcon/>
                            </button>
                        {this.state.authenticated.user == this.state.user ? (
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