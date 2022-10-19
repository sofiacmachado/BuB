import React from 'react';
import  { Layout } from '../layout';
import './book.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getCartFromServer, addToCart } from "../cart_api.js";
import {isLoggedIn} from '../login_api';
import { handleErrors } from '../utils/fetchHelper';

class Book extends React.Component {

  state = {
    book: {},
    loading: true,
    cart: [],
  }

  componentDidMount() {
    const cart = getCartFromServer();
    fetch(`/api/books/${this.props.book_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          book: data.book,
          loading: false,
          cart: data.cart,
        })
      })
  }

  onAddToCart() {
    addToCart(this.state.book.id);
    const cart = getCartFromServer();
    this.setState({cart: cart});
  }

    render () {

      const { book, loading, authenticated, cart } = this.state;
      const {
        title,
        author,
        isbn,
        genre,
        description,
        condition,
        condition_description,
        price,
        image,
        user,
        } = book;

      if (loading) {
        return <p>Loading...</p>;
      }

        return (
            <Layout cartItems={cart.length} authenticated={authenticated}>
              <div className="container mybooks-container">
                  <div className="latestbook text-body text-decoration-none" key={id}>
                    <div className="row mt-4 mb-4">
                    <div className="col col-lg-2 mb-4">
                        <div
                        className="book-image mb-3"
                        style={{ backgroundImage: `url(${image})` }}
                        />
                    </div>
                        <div className="col-6 col-lg-2 mb-4">
                        <h6 className="mb-2 text-uppercase">"{title}"</h6>
                        <p className="text-uppercase mb-1 text-secondary">
                            <small>
                            <b>{author}</b>
                            </small>
                        </p>
                        <p className="text-uppercase mb-4 text-secondary">
                            <small>
                            <b>{genre}</b>
                            </small>
                        </p>
                        <p className="text-uppercase mb-4 text-secondary">
                            <small>
                            <b>ISBN: {isbn}</b>
                            </small>
                        </p>
                        <p className="text-uppercase mb-4 price-tag-title">
                            Price: <span className='price-tag'>{price}$</span></p>
                        <p>
                        </p>
                        </div>
                        <div className="col-8 col-lg-6 mb-4 third-column">
                        <small className="text-secondary">Book's condition:</small>
                        <p className="text-secondary condition">
                            {condition}
                        </p>
                        <small className="text-secondary">Detailed Condition:</small>
                        <p className="text-secondary condition">
                            {condition_description}
                        </p>
                        <p className="mb-0 text-secondary">
                            {description}
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
      
      document.addEventListener('DOMContentLoaded', () => {
        const node = document.getElementById('params');
        const data = JSON.parse(node.getAttribute('data-params'));
        ReactDOM.render(
          <Book book_id={data.book_id} />,
          document.body.appendChild(document.createElement('div')),
        )
      })