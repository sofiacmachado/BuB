import React from 'react';
import  { Layout } from '../layout';
import './book.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addToCart, getSessionAndCart } from "../cart_api.js";
import { handleErrors } from '../utils/fetchHelper';
import StarIcon from '@mui/icons-material/Star';
import Tooltip from "@material-ui/core/Tooltip";

//removed cart
class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      loading: true,
      authenticated: false,
      cart: [],
      myUsername: null,
    };
    this.onAddToCart = this.onAddToCart.bind(this);
  }


  componentDidMount() {
    fetch(`/api/books/${this.props.book_id}`)
    .then(handleErrors)
    .then(data => {
      this.setState({
        book: data.book,
        loading: false,
      });
    });
    
    getSessionAndCart()
    .then(data => {
      this.setState({
        authenticated: data.authenticated,
        cart: data.cart,
        myUsername: data.username,
      });
    });
  }
  
  onAddToCart() {
    addToCart(this.state.book.id)
    .then((cart) => { this.setState({ cart: cart }); });
    return false;
  }
  
  render () {
    const { cart, book, loading, authenticated, myUsername } = this.state;
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
      user,
    } = book;

    if (loading) {
      return <p>Loading...</p>;
    }

    const addErrorMessage = !authenticated
      ? "You have to be logged in."
      : "This book is yours.";

    return (
      <Layout cartItems={cart.length} authenticated={authenticated}>
        <div className="container mybooks-container">
          <div className="latestbook text-body text-decoration-none" key={book.id}>
            <div className="row mt-4 mb-4">
              <div className="col col-lg-2 mb-4">
                <div
                className="book-image mb-3"
                style={{ backgroundImage: `url(${image_url})` }}
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
                    <b>{rating} <StarIcon/></b>
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
                    {description}
                </p>
                <p className="mb-0 text-secondary">
                    {summary}
                </p>
              </div>
    
        {cart.includes(book.id) ?
          (<div className="col-4 col-lg-2 mb-4 d-grid for-sale-container">
            <button
            className="btn btn-edit mt-3" disabled>
            <ShoppingCartIcon/> On your Cart
            </button>
          </div>) :
          authenticated === true && user.username !== myUsername ? 
          (<div className="col-4 col-lg-2 mb-4 d-grid for-sale-container">
            <button
            className="btn btn-edit mt-3" onClick={this.onAddToCart}>
            <ShoppingCartIcon/> Add to Cart
            </button>
          </div>) : 
          (<div className="col-4 col-lg-2 mb-4 d-grid add-btn">
            <Tooltip title={addErrorMessage} placement="top">
              <div>
                <button
                className="btn btn-edit mt-3" disabled>
                <ShoppingCartIcon/> Add to Cart
                </button>
              </div>
            </Tooltip>
          </div>)
          }
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Book;