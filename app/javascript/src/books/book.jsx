import React from 'react';
import  { Layout } from '../layout';
import './book.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import data from "../data.js";
import { getCartFromServer, addToCart } from "../cart_api.js";
import {isLoggedIn} from '../login_api';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.onAddToCart = this.onAddToCart.bind(this);
    this.state = {
      loading: false,
      authenticated: false,
      book: {},
      cart: [],
    };
  }

  
  //fetch
  componentDidMount() {
    const logIn = isLoggedIn();
    const cart = getCartFromServer();
    const url_parts = window.location.href.split('/');
    const url_id = +url_parts[url_parts.length - 1];
    const book = data.find(b => b.id === url_id);

    this.setState({
      loading: false,
      authenticated: logIn,
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

      const { loading, authenticated, cart } = this.state;

      const url_parts = window.location.href.split('/');
      const url_id = +url_parts[url_parts.length - 1];
      const book = data.find(b => b.id === url_id);

      console.log(this.state.editing);

      if (loading) {
        return <p>Loading...</p>;
      }

        return (
            <Layout cartItems={cart.length} authenticated={authenticated}>
              <div className="container mybooks-container">
                  <div className="latestbook text-body text-decoration-none" key={book.id}>
                    <div className="row mt-4 mb-4">
                    <div className="col col-lg-2 mb-4">
                        <div
                        className="book-image mb-3"
                        style={{ backgroundImage: `url(${book.image})` }}
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
                    </div>
                    </div>
                </div>
              </div>
            </Layout>
          );
        }
      }
      
      export default Book;