import React from 'react';
import ReactDOM from 'react-dom';
import  { Layout } from '../layout';
import './book.scss';
import data from "../data.js";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      authenticated: false,
      book: {},
    };

    //this.removeBook = this.removeBook.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleIsbnChange = this.handleIsbnChange.bind(this);
    this.handleConditionChange = this.handleConditionChange.bind(this);
    this.handleUserDescriptionChange = this.handleUserDescriptionChange.bind(this);
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
  handleUserDescriptionChange = (event) => {
    this.setState({ user_description: event.target.value });
  };
  handlePriceChange = (event) => {
    this.setState({ price: event.target.value });
  };
  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  
  //fetch
  componentDidMount() {
    
    const url_parts = window.location.href.split('/');
    const url_id = +url_parts[url_parts.length - 1];
    const book = data.find(b => b.id === url_id);

    const formData = new FormData();
    
    const image = document.getElementById("addPhoto");

    for (let i = 0; i < image.files.length; i++) {
      formData.append("book[image]", image.files[i]);
    }

    formData.set("book[title]", this.state.title);
    formData.set("book[auhtor]", this.state.auhtor);
    formData.set("book[isbn]", this.state.isbn);
    formData.set("book[description]", this.state.description);
    formData.set("book[condition]", this.state.condition);
    formData.set("book[user_description]", this.state.user_description);
    formData.set("book[genre]", this.state.genre);
    formData.set("book[price]", this.state.price);
    formData.set("book[rating]", this.state.rating);


    this.setState({
      loading: false,
      authenticated: false,
      book: book,
    });
  
  }

    render () {

      const {
        /* title,
        auhtor,
        isbn,
        description,
        condition,
        user_description,
        genre,
        price,
        rating,
        image, */
        loading,
        authenticated,
      } = this.state;

      const url_parts = window.location.href.split('/');
      const url_id = +url_parts[url_parts.length - 1];
      const book = data.find(b => b.id === url_id);

      if (loading) {
        return <p>Loading...</p>;
      }

      console.log('render');

        return (
            <Layout>
              <div className="container mybooks-container">
                    <div className="row mt-4 mb-4">
                      <form className="col-12" onSubmit={this.updateBook}>
                        <label href='#' html="addPhoto">Change Image</label>
                        <input
                          type="file"
                          className="form-control-file"
                          id="addPhoto"
                          accept="image/*"
                          value={this.state.image}
                          onChange={this.handleImageChange}
                        />
                       {/*  <div
                          className="book-image mb-3"
                          style={{ backgroundImage: `url(${book.image})` }}
                        /> */}
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
                                  onChange={this.handleTitleChange}
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
                                      onChange={this.handleAuthorChange}
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
                                      placeholder={book.genre}
                                      onChange={this.handleGenreChange}
                                      value={this.state.genre}
                                      maxLength="200"
                                    />
                                    <div className="form-group col-md-6">
                                      <label className="mb-1" htmlFor="inputIsbn">ISBN</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="inputIsbn"
                                        placeholder={book.isbn}
                                        onChange={this.handleIsbnChange}
                                        value={this.state.isbn}
                                        maxLength="200"
                                      />
                                    </div>
                                  </div>
                                </div>
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
                                      onChange={this.handleConditionChange}
                                      value={this.state.condition}
                                    >
                                      <option>New</option>
                                      <option>Used</option>
                                      <option>Collectible</option>
                                    </select>
                                  </p>
                                  <p>
                                    <label className="mb-1" htmlFor="inputUserDescription">Description</label>
                                    <textarea
                                      type="text"
                                      className="form-control"
                                      rows="8"
                                      id="inputDescription"
                                      placeholder={book.user_description}
                                      onChange={this.handleUserDescriptionChange}
                                      value={this.state.user_description}
                                      maxLength="800"
                                    />
                                  </p>
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
                                </div>
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
                                onChange={this.handleDescriptionChange}
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
                             onClick={((e) => e, this.removeBook)}
                            >
                              Remove book
                            </button>
                            <a href={`/mybooks`} 
                              className="btn btn-outline-secondary ms-2">
                              Cancel
                            </a>
                          </div>
                        </div>
                      </form>{" "}
                    </div>
              </div>
            </Layout>
          );
        }
      }
      
        ReactDOM.render(
            <Edit />,
            document.body.appendChild(document.createElement("div"))
        );