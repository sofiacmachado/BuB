import React from 'react';
import Layout from '../layout';
import ReactDOM from 'react-dom';
import './book.scss';

const book1 = {
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

class Book extends React.Component {


    constructor(props) {
        super(props);
        console.log('bob');
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
    /*
  
    
        this.editMode = this.editMode.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.removeProperty = this.removeProperty.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePropertyTypeChange = this.handlePropertyTypeChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleBedroomChange = this.handleBedroomChange.bind(this);
        this.handleBedChange = this.handleBedChange.bind(this);
        this.handleBathChange = this.handleBathChange.bind(this);
        this.handleMaxGuestChange = this.handleMaxGuestChange.bind(this);
    }
        
        
  editMode = (e) => {
    e.preventDefault();
    this.setState({ editing: true });
  };

  cancelEdit = (e) => {
    e.preventDefault();
    this.setState({ editing: false });
  };

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handlePropertyTypeChange = (event) => {
    this.setState({ book_type: event.target.value });
  };
  handleCityChange = (event) => {
    this.setState({ city: event.target.value });
  };
  handleCountryChange = (event) => {
    this.setState({ country: event.target.value });
  };
  handlePriceChange = (event) => {
    this.setState({ price_per_night: event.target.value });
  };
  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };
  handleBedroomChange = (event) => {
    this.setState({ bedrooms: event.target.value });
  };
  handleBedChange = (event) => {
    this.setState({ beds: event.target.value });
  };
  handleBathChange = (event) => {
    this.setState({ baths: event.target.value });
  };
  handleMaxGuestChange = (event) => {
    this.setState({ max_guests: event.target.value });
  };
 */
  //fetch
      componentDidMount() {
        let data = {
          book: book1,
        }

        this.setState({
          loading: false,

          id: data.book.id,
          title: data.book.title,
          description: data.book.description,
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

 /*
  updateProperty = (e) => {
    const {
      title,
      author,
      isbn,
      description,
      condition,
      genre,
      price,
      rating,
    } = this.state;

    if (e) {
      e.preventDefault();
    }

    let formData = new FormData();

    formData.set("book[title]", title);
    formData.set("book[description]", description);
    formData.set("book[author]", author);
    formData.set("book[isbn]", isbn);
    formData.set("book[condition]", condition);
    formData.set("book[price]", price);
    formData.set("book[rating]", rating);
    formData.set("book[genre]", genre);

    fetch(
      `/api/properties/${this.props.book_id}/update/`,
      safeCredentialsForm({
        method: "PUT",
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

  
  removeProperty = (e) => {
    e.preventDefault(); 
    fetch(`/api/properties/${this.props.book_id}`, {
      method: 'DELETE',
    })
    .then(handleErrors)
    .then(data => {
      window.location = '/myproperties';
    });
    return false;
  } */

    render () {
        return (
            <Layout>
              <div
                className="book-image mb-3"
                style={{ backgroundImage: `url(${this.state.image_url})` }}
              />
              <div className="container">
                {this.state.editing === true ? (
                  <div className="row">
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
                  <div className="row">
                    <div className="info col-12 col-lg-8">
                      <div className="mb-3">
                        <h3 className="mb-0">{this.state.title}</h3>
                        <p className="text-uppercase mb-0 text-secondary">
                          <small>
                            {this.state.author} - {this.state.genre}
                          </small>
                        </p>
                        <p className="mb-0">
                          <small>
                            Hosted by <b>{this.state.user.username}</b>
                          </small>
                        </p>
                      </div>
                      <div className="row">
                        <div className="col-9">
                          <p className="mb-0 text-capitalize">
                            <b>{this.state.condition}</b>
                          </p>
                        </div>
                        <div className="col-3">
                          {this.state.authenticated.username == this.state.user.username ? (
                            <button
                              className="btn btn-outline-secondary"
                            //  onClick={((e) => e, this.editMode)}
                            >
                              Edit book
                            </button>
                          ) : null}
                        </div>
                      </div>
                      <hr />
                      <p>{this.state.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </Layout>
          );
        }
      }
      
      export default Book;