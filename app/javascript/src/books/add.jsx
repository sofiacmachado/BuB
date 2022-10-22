import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from '../layout';
import './add.scss';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { getSessionAndCart } from "../cart_api.js";

class Add extends React.Component {

  constructor(props) {
    super(props);
    this.state =   {
        authenticated: false,
        cart: [],
    }
  }

  componentDidMount() {
    getSessionAndCart()
    .then(data => {
      this.setState({
        authenticated: data.authenticated,
        cart: data.cart,
      });
    });
  }

  render() {
    const { cart, authenticated } = this.state;

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
                      />
                      
                      <label className="label-text" htmlFor="inputAuthor">Author's Name</label>
                      <input
                      type="text"
                      className="form-control"
                      id="inputAuthor"
                      placeholder="ex: Alexandre Dumas"
                      maxLength="70"
                      />

                      <label className="label-text" htmlFor="inputGenre">Genre</label>
                      <select
                      id="inputGenre"
                      className="form-control"
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
                          />

                      <label className="label-text" htmlFor="inputSummary">Summary</label>
                      <textarea
                      type="text"
                      className="form-control"
                      rows="6"
                      id="inputSummary"
                      placeholder="ex: Cornelius von Baerle, a respectable tulip-grower, lives only to cultivate the elusive black tulip and win a magnificent prize for its creation. But after his powerful godfat..."
                      maxLength="2000"
                      />
                      
                  </div>
                  <div className="form-group d-grid col-md-6">
                      <label className="label-text" htmlFor="inputPrice">Price</label>
                      <input
                      type="number"
                      className="form-control"
                      id="inputPrice"
                      placeholder="ex: 9 $"
                      />

                      <label className="label-text" htmlFor="inputBookCondition">Book's Condition</label>
                      <select
                      id="inputBookCondition"
                      className="form-control"
                      type="text"
                      >
                      <option hidden className='light'>Select an Option</option> 
                      <option>New</option>
                      <option>Used (like new)</option>
                      <option>Used (good)</option>
                      <option>Used (fair)</option>
                      <option>Refurbished</option>
                      </select>

                      <label className="label-text" htmlFor="inputDescription">Detailed Condition</label>
                      <textarea
                      type="text"
                      className="form-control"
                      rows="2"
                      id="inputDescription"
                      placeholder="ex: Read once, corners are a little bent"
                      maxLength="200"
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
    <Add />,
  document.body.appendChild(document.createElement("div"))
  );