import React from 'react';
import ReactDOM from 'react-dom';
import  { Layout } from '../layout';
import './add.scss';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import RemoveIcon from '@mui/icons-material/Remove';
import { getSessionAndCart } from "../cart_api.js";
import { handleErrors, safeCredentialsForm } from '../utils/fetchHelper';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    const url_parts = window.location.href.split('/');
    const book_id = +url_parts[url_parts.length - 1];
    this.state = {
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
      book_id: book_id,

      loading: true,
      authenticated: false,
      editing: false,
      cart: []
    };

    this.cancelEdit = this.cancelEdit.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleIsbnChange = this.handleIsbnChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleConditionChange = this.handleConditionChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  cancelEdit = (e) => {
    e.preventDefault();
    this.setState({ editing: false });
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

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handlePriceChange = (event) => {
    this.setState({ price: event.target.value });
  };

  handleSummaryChange = (event) => {
    this.setState({ summary: event.target.value });
  };

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        this.setState({
          image_url: reader.result,
        })
      }
    }
    reader.readAsDataURL(e.target.files[0])
  };

  deleteImage = () => {
    this.setState({
      image_url: "",
    })
  }

  componentDidMount() {    
    getSessionAndCart()
    .then(data => {
      this.setState({
        authenticated: data.authenticated,
        cart: data.cart,
      });
    });
 
    fetch(`/api/books/${this.state.book_id}`)
    .then(handleErrors)
    .then(data => {
      this.setState({
        loading: false,
        book: data.book,

        id: data.book.id,
        title: data.book.title,
        author: data.book.author,
        isbn: data.book.isbn,
        genre: data.book.genre,
        rating: data.book.rating,
        summary: data.book.summary,
        condition: data.book.condition,
        description: data.book.description,
        price: data.book.price,
        image_url: data.book.image_url,
        user: data.book.user,
      });
    });
  }

  updateBook = (e) => {
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
      image_url,
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
    formData.set("book[image_url]", image_url);



  fetch(
    `/api/books/${this.state.book_id}`,
    safeCredentialsForm({
      method: "PUT",
      body: formData,
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log(response);
      window.location = `/mybooks`;
    })
    .catch((error) => {
      console.log(error);
    });
};

  removeBook = (e) => {
    e.preventDefault(); 
    fetch(`/api/books/${this.state.book_id}`, {
      method: 'DELETE',
    })
    .then(handleErrors)
    .then(data => {
      window.location = '/mybooks';
    });
    return false;
  };


  render () {
    const { cart, loading, authenticated, book, image_url } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!authenticated) {
      return (
        <Layout>
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
                        value={this.state.title}
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
                        value={this.state.author}
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
                        value={this.state.isbn}
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
                        value={this.state.summary}
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
                        value={this.state.price}
                        maxLength="200"
                    />

                    <label className="mb-1" htmlFor="inputCondition">
                        Book Condition
                    </label>
                    <select
                        id="inputCondition"
                        className="form-control"
                        onChange={this.handleConditionChange}
                        value={this.state.condition}
                    >
                         <option>New</option>
                      <option>Used (like new)</option>
                      <option>Used (good)</option>
                      <option>Used (fair)</option>
                      <option>Refurbished</option>
                    </select>

                    <label className="label-text" htmlFor="inputDescription">Description</label>
                    <textarea
                        type="text"
                        className="form-control"
                        rows="8"
                        id="inputDescription"
                        placeholder={book.description}
                        onChange={this.handleDescriptionChange}
                        value={this.state.description}
                        maxLength="800"
                    />
                    
                    <label className="addPhoto mt-3 mb-2" htmlFor="addPhoto">
                      { (image_url == "" || image_url == null) ?
                        (<a className="addPhotoText" >
                            Change Image
                          <AddToPhotosIcon />
                          <img src={image_url} alt="" id="img" className="img" />
                        </a>) :
                        (<a className="addPhotoText" onClick={this.deleteImage}>
                            Remove book image
                          <RemoveIcon />
                          <img src={image_url} alt="" id="img" className="img" />
                        </a>)
                      }
                    </label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="addPhoto"
                      accept="image/*"
                      onChange={this.imageHandler} 
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-2" onClick={((e) => e, this.editMode)}>
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