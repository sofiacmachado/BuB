import React from 'react';
import ReactDOM from 'react-dom';
import  { Layout } from '../layout';
import './add.scss';
import data from "../data.js";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import {isLoggedIn} from '../login_api';
import { getCartFromServer } from "../cart_api.js";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      authenticated: false,
      book: {},
      cart: []
    };

    //this.removeBook = this.removeBook.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleIsbnChange = this.handleIsbnChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleConditionChange = this.handleConditionChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }
  
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleAuthorChange = (event) => {
    this.setState({ author: event.target.value });
  };

  handleGenreChange = (event) => {
    this.setState({ genre: event.target.value });
  };

  handleIsbnChange = (event) => {
    this.setState({ isbn: event.target.value });
  };

  handleConditionChange = (event) => {
    this.setState({ condition: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handlePriceChange = (event) => {
    this.setState({ price: event.target.value });
  };

  handleSummaryChange = (event) => {
    this.setState({ summary: event.target.value });
  };

  submitEdit() {
    const formData = new FormData();
    const image = document.getElementById("addPhoto");
    
    for (let i = 0; i < image.files.length; i++) {
      formData.append("book[image]", this.state.image.files[i]);
    }

    formData.set("book[title]", this.state.title);
    formData.set("book[auhtor]", this.state.auhtor);
    formData.set("book[isbn]", this.state.isbn);
    formData.set("book[summary]", this.state.summary);
    formData.set("book[condition]", this.state.condition);
    formData.set("book[description]", this.state.description);
    formData.set("book[genre]", this.state.genre);
    formData.set("book[price]", this.state.price);
    formData.set("book[rating]", this.state.rating);
  }

  componentDidMount() {    
    const url_parts = window.location.href.split('/');
    const url_id = +url_parts[url_parts.length - 1];
    const book = data.find(b => b.id === url_id);
    const logIn = isLoggedIn();
    getCartFromServer()
    .then((cart) => {
      this.setState({
        cart: cart,
        loading: false,
        authenticated: logIn,
        book: book,
      });
    });
  }

  render () {
    const { cart, loading, authenticated} = this.state;
    const url_parts = window.location.href.split('/');
    const url_id = +url_parts[url_parts.length - 1];
    const book = data.find(b => b.id === url_id);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!authenticated) {
      return (
        <Layout authenticated={authenticated}>
          <div className="container mybooks-container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="border p-4">
                  <p className="mb-0">You have to be logged in.</p>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    } else {
      return (
            <Layout cartItems={cart.length} authenticated={authenticated}>
              <div className="container mybooks-container mb-4">
              <h4 className="mb-4">Edit your book</h4>
                <form className="col-12" onSubmit={this.updateBook}>
                    <div className="row">
                    <div className="form-group d-grid col-md-6">
                        <label className="label-text" htmlFor="inputTitle">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputTitle"
                            placeholder={book.title}
                            value={book.title}
                            onChange={this.handleTitleChange}
                            maxLength="70"
                        />

                        <label className="label-text" htmlFor="inputAuthor">Author</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAuthor"
                            placeholder={book.author}
                            onChange={this.handleAuthorChange}
                            value={book.author}
                            maxLength="70"
                        />

                        <label className="label-text" htmlFor="inputGenre">Genre</label>
                        <select id="inputGenre" onChange={this.handleGenreChange}
                            value={this.state.genre} className="form-control">
                            <option hidden className='light'>Select an Option</option> 
                            <option>Classic</option>
                            <option>Fantasy</option>
                            <option>Fiction</option>
                            <option>Poetry</option>
                            <option>Non-Fiction</option>
                        </select>

                        <label className="label-text" htmlFor="inputIsbn">ISBN</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputIsbn"
                            placeholder={book.isbn}
                            onChange={this.handleIsbnChange}
                            value={book.isbn}
                            maxLength="200"
                        />

                        <label className="mb-1" htmlFor="inputSummary">Summary</label>
                        <textarea
                            type="text"
                            className="form-control"
                            rows="10"
                            id="inputSummary"
                            placeholder={book.summary}
                            onChange={this.handleSummaryChange}
                            value={book.summary}
                            maxLength="2000"
                        />
                     
                    </div>

                    <div className="form-group d-grid col-md-6">

                        <label className="mb-1" htmlFor="inputPrice">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="inputPrice"
                            placeholder={`$${book.price}`}
                            onChange={this.handlePriceChange}
                            value={book.price}
                            maxLength="200"
                        />

                        <label className="mb-1" htmlFor="inputCondition">
                            Book Condition
                        </label>
                        <select
                            id="inputCondition"
                            className="form-control"
                            onChange={this.handleConditionChange}
                            value={book.condition}
                        >
                            <option>New</option>
                            <option>Used</option>
                            <option>Collectible</option>
                        </select>

                        <label className="label-text" htmlFor="inputDescription">Description</label>
                        <textarea
                            type="text"
                            className="form-control"
                            rows="8"
                            id="inputDescription"
                            placeholder={book.description}
                            onChange={this.handleDescriptionChange}
                            value={book.description}
                            maxLength="800"
                        />
                       
                        <label className="addPhoto mt-3 mb-2" htmlFor="addPhoto">
                            <span className="addPhotoText">Add book photo
                                Change Image <AddToPhotosIcon />
                            </span>
                        </label>
                        <input
                          type="file"
                          className="form-control-file"
                          id="addPhoto"
                          accept="image/*"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">
                        Update book 
                    </button>
                    <button className="btn btn-danger mb-2"
                        onClick={((e) => e, this.removeBook)}
                    >
                        Remove book
                    </button>
                    <a href={`/mybooks`} 
                        className="btn btn-outline-secondary mb-2">
                        Cancel
                    </a>
                    </div>
                </form>{" "}
              </div>
            </Layout>
          );
    }
  }
}
    
ReactDOM.render(
  <Edit />,
  document.body.appendChild(document.createElement("div"))
);