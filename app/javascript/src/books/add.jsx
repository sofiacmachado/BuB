import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from '../layout';
import './add.scss';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { getSessionAndCart } from "../cart_api.js";
import { handleErrors, safeCredentialsForm } from '../utils/fetchHelper';
import  GoogleSearch from '../books/googleSearch/GoogleSearch';  
import request from 'superagent';
import GoogleSearchPop from './googleSearch/GoogleSearchPop';

class Add extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      popUpVisible: false,
      books: [],
      searchField: '',

      title: "",
      author: "",
      isbn: "",
      genre: "",
      rating: "",
      summary: "",
      condition: "",
      description: "",
      price: "",
      image_url: "",
      user: "",

      loading: true,
      authenticated: false,
      editing: false,
      cart: []
    };
    
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleIsbnChange = this.handleIsbnChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleConditionChange = this.handleConditionChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.setGoogleData = this.setGoogleData.bind(this);
  };

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

  handleRatingChange = (event) => {
    this.setState({ rating: event.target.value });
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
  
  componentDidMount() {

    getSessionAndCart()
    .then(data => {
      this.setState({
        authenticated: data.authenticated,
        cart: data.cart,
        loading: false,
      });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    request
        .get("https://www.googleapis.com/books/v1/volumes")
        .query({ q: this.state.searchField })
        .then((data) => {
            console.log(data);
            this.setState({ 
              books: [...data.body.items],
              popUpVisible: true,
            })
    })
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

  setGoogleData = (e, i) => {
    const googleBook = this.state.books[i];
    const isbn = (googleBook.volumeInfo.industryIdentifiers != null 
    && googleBook.volumeInfo.industryIdentifiers.length > 0)
    ? googleBook.volumeInfo.industryIdentifiers[0].identifier
    : ''; 
    const summary = (googleBook.volumeInfo.description != null 
      && googleBook.volumeInfo.description.length > 500)
    ? googleBook.volumeInfo.description.substring(0, 500) + '...'
    : googleBook.volumeInfo.description || '';
    const image_url = googleBook.volumeInfo.hasOwnProperty('imageLinks') == false ?
   "https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg/revision/latest?cb=20141028171337" 
   : googleBook.volumeInfo.imageLinks.thumbnail;
    this.setState({
      popUpVisible: false,
      title: googleBook.volumeInfo.title,
      author: googleBook.volumeInfo.authors,
      rating: googleBook.volumeInfo.averageRating,
      genre: googleBook.volumeInfo.categories,
      summary: summary,
      isbn: isbn,
      image_url: image_url, 
    });
  }

  submitBook = (e) => {
    const {
      title,
      author,
      isbn,
      genre,
      rating,
      summary,
      condition,
      description,
      price,
    } = this.state;

    if (e) {
      e.preventDefault();
    }
    
    let formData = new FormData();

    var image = document.getElementById("addPhoto");

    for (let i = 0; i < image.files.length; i++) {
      formData.append("book[image]", image.files[i]);
    }
  
    formData.set("book[title]", title);
    formData.set("book[author]", author);
    formData.set("book[isbn]", isbn);
    formData.set("book[summary]", summary);
    formData.set("book[condition]", condition);
    formData.set("book[description]", description);
    formData.set("book[genre]", genre);
    formData.set("book[price]", price);
    formData.set("book[rating]", rating);

    fetch(
      `/api/mybooks/add`,
      safeCredentialsForm({
        method: "POST",
        body: formData,
      })
    )
    .then(handleErrors)
    .then((response) => {
      console.log(response);
      window.location = `/book/${response.book.id}`;
    })
    .catch((error) => {
      console.log(error);
    });
  };



  render() {
    const { cart, authenticated, data, books, popUpVisible } = this.state;

    if (authenticated === false) {
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
      }
    if (authenticated === true) {
      return (
        <Layout cartItems={cart.length} authenticated={authenticated}>
          <div className="container mybooks-container mb-4">
            <h4 className="mb-4">Add a new book</h4>
            <GoogleSearch 
              data={this.state} 
              handleSubmit={this.handleSubmit} 
              handleChange={this.handleChange} >  
            </GoogleSearch>
            { popUpVisible === true ?
              <GoogleSearchPop books={books} onSelect={this.setGoogleData}>
              </GoogleSearchPop> : null
            }
            <form onSubmit={this.submitBook}>
              <div className="row">
                  <div className="form-group d-grid col-md-6">
                      <label className="label-text" htmlFor="inputTitle">Book Title</label>
                      <input
                      type="text"
                      className="form-control"
                      id="inputTitle"
                      placeholder="ex: Black Tulip"
                      maxLength="70"
                      value={this.state.title}
                      onChange={this.handleTitleChange}
                      />
                      
                      <label className="label-text" htmlFor="inputAuthor">Author's Name</label>
                      <input
                      type="text"
                      className="form-control"
                      id="inputAuthor"
                      placeholder="ex: Alexandre Dumas"
                      maxLength="70"
                      onChange={this.handleAuthorChange}
                      value={this.state.author}
                      />

                      <label className="label-text" htmlFor="inputGenre">Genre</label>
                      <select
                      type='text'
                      id="inputGenre"
                      className="form-control"
                      onChange={this.handleGenreChange}
                      value={this.state.genre}
                      >
                      <option hidden className='light'>Select an Option</option> 
                      <option>Classic</option>
                      <option>Fantasy</option>
                      <option>Fiction</option>
                      <option>Poetry</option>
                      <option>Non-Fiction</option>
                      </select>

                      <label className="label-text" htmlFor="inputIsbn">ISBN</label>
                          <input
                          type="number"
                          className="form-control"
                          id="inputIsbn"
                          placeholder="ex: 9789725647417"
                          onChange={this.handleIsbnChange}
                          value={this.state.isbn}
                          />

                      <label className="label-text" htmlFor="inputSummary">Summary</label>
                      <textarea
                      type="text"
                      className="form-control"
                      rows="6"
                      id="inputSummary"
                      placeholder="ex: Cornelius von Baerle, a respectable tulip-grower, lives only to cultivate the elusive black tulip and win a magnificent prize for its creation. But after his powerful godfat..."
                      maxLength="2000"
                      onChange={this.handleSummaryChange}
                      value={this.state.summary}
                      />
                      
                  </div>
                  <div className="form-group d-grid col-md-6">
                      <label className="label-text" htmlFor="inputPrice">Price</label>
                      <input
                      type="number"
                      className="form-control"
                      id="inputPrice"
                      placeholder="ex: 9 $"
                      onChange={this.handlePriceChange}
                      value={this.state.price}
                      />

                      <label className="label-text" htmlFor="inputBookCondition">Book's Condition</label>
                      <select
                      id="inputBookCondition"
                      className="form-control"
                      type="text"
                      onChange={this.handleConditionChange}
                      value={this.state.condition}
                      >
                      <option hidden className='light'>Select an Option</option> 
                      <option>New</option>
                      <option>Used (like new)</option>
                      <option>Used (good)</option>
                      <option>Used (fair)</option>
                      <option>Refurbished</option>
                      </select>

                      <label className="label-text" htmlFor="inputRating">Rating</label>
                      <select
                      id="inputRating"
                      className="form-control"
                      type="number"
                      onChange={this.handleRatingChange}
                      value={this.state.rating}
                      >
                      <option hidden className='light'>Select an Option</option> 
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      </select>

                      <label className="label-text" htmlFor="inputDescription">Detailed Condition</label>
                      <textarea
                      type="text"
                      className="form-control"
                      rows="2"
                      id="inputDescription"
                      placeholder="ex: Read once, corners are a little bent"
                      maxLength="200"
                      onChange={this.handleDescriptionChange}
                      value={this.state.description}
                      />
                      
                      
                  <label className="addPhoto mt-3 mb-2" htmlFor="addPhoto">
                    <span className="addPhotoText">Add book photo
                    <AddToPhotosIcon />
                    </span>
                  </label>
                  <input
                      type="file"
                      className="form-control form-control-file"
                      id="addPhoto"
                      accept="image/*"
                      />
                  </div>
                  <button type="submit" className="btn btn-add">
                  Submit new book
                  </button>
                  </div>
            </form>
          </div>
        </Layout>
      );
    }
  }
}


ReactDOM.render(
  <React.StrictMode>
  <Add />
</React.StrictMode>,
  document.body.appendChild(document.createElement("div"))
  );