import React from "react";
import { Layout } from "../layout";
import CheckIcon from '@mui/icons-material/Check';
import "./success.scss";
import { getCartFromServer } from "../cart_api.js";
import {isLoggedIn} from '../login_api';

const BOOKSTORE = [
  {
    id: 1,
    title: 'Anna Karenina',
    author: "Leo Tolstoy",
    isbn: '9780140449174',
    summary: "Anna Karenina seems to have everything - beauty, wealth, popularity and an adored son. But she feels that her life is empty until the moment she encounters the impetuous officer Count Vronsky. Their subsequent affair scandalizes society and family alike and soon brings jealously and bitterness in its wake. Contrasting with this tale of love and self-destruction is the vividly observed story of Levin, a man striving to find contentment and a meaning to his life - and also a self-portrait of Tolstoy himself.",
    condition: "Used",
    description: 'Spine has some folds',
    genre: 'classic',
    price: 4,
    rating: 4.08/5,
    image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1426930853l/153.jpg',
    user: 1
  },
  {
    id: 2,
    title: 'Notes from Underground',
    author: "Fyodor Dostoevsky",
    isbn: '9780679734529',
    summary: "Notes from Underground is a novella written in 1864 by Fyodor Dostoevsky, and is considered by many to be one of the first existentialist novels. The novella presents itself as an excerpt from the rambling memoirs of a bitter, isolated, unnamed narrator, who is a retired civil servant living in St. Petersburg.",
    condition: "Like new",
    description: 'Book is in perfect conditions',
    genre: 'classic',
    price: 8,
    rating: 4.2/5,
    image: 'https://images-na.ssl-images-amazon.com/images/I/41kxGhOH0vL._SX322_BO1,204,203,200_.jpg',
    user: 1
  }
];
      
class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      author: '',
      summary: '',
      isbn: '',
      condition: '',
      description: '',
      genre: '',
      price: '',
      rating: '',
      image: '',
      user: '',
      paid: false,
      loading: false,
      authenticated: false,
      cart: [],
    };
  }

  componentDidMount() {
    const logIn = isLoggedIn();
    let data = {
      book:  BOOKSTORE[0],
    }
    getCartFromServer()
    .then((cart) => {
      this.setState({
        loading: false,
        id: data.book.id,
        author: data.book.author,
        title: data.book.title,
        summary: data.book.summary,
        description: data.book.description,
        condition: data.book.condition,
        genre: data.book.genre,
        price: data.book.price,
        isbn: data.book.isbn,
        rating: data.book.rating,
        image: data.book.image,
        user: data.book.user,
        paid: true,
        authenticated: logIn,
        cart: cart,
      });
    });
  }

  render() {
    const { loading, cart, authenticated } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <Layout  cartItems={cart.length} authenticated={authenticated}>
        <div className="container mybooks-container">
                    <div className="row">
                        <div className="col-4 mybooks-title">
                            <h4 className="mb-1">Your order is confirmed!</h4>
                        </div>
                    </div>
            <div className="row mt-4 mb-4">
                <div className="col col-lg-2 mb-4">
                    <div
                    className="book-image mb-3"
                    style={{ backgroundImage: `url(${this.state.image})` }}
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
                    <p className="text-uppercase mb-4 text-secondary">
                        <small>
                        <b>Seller: {this.state.user}</b>
                        </small>
                    </p>
                    </div>
                    <div className="col-8 col-lg-6 mb-4 third-column">
                    <small className="text-secondary">Book's condition:</small>
                    <p className="text-secondary condition">
                        {this.state.condition}
                    </p>
                    <small className="text-secondary">Detailed Condition:</small>
                    <p className="text-secondary condition">
                        {this.state.description}
                    </p>
                    <p className="mb-0 text-secondary">
                        {this.state.summary}
                    </p>
                    </div>
                    <div className="col-4 col-lg-2 mb-4 d-grid for-sale-container">
                        <p className="for-sale rounded">
                        <p className="text-uppercase d-flex justify-content-center mt-4">
                        Amount: 
                        </p>
                        <span className='price-tag d-flex justify-content-center mb-4'>{this.state.price}$</span>
                            Payment Status:{" "}
                            {this.state.paid === true ? (
                                <span className="mb-4 text-success d-flex justify-content-center">Paid <CheckIcon/></span>
                            ) : (
                                <span className="mb-4 text-danger d-flex justify-content-center">Unpaid</span>
                            )}
                            {this.state.paid === true ? (
                            <a href="#" className="btn btn-success mb-2 d-none disabled pay-btn">
                                Pay now
                            </a>
                            ) : (
                            <a
                                href=""
                                className="btn btn-add mb-4 text-white pay-btn"
                            >
                                Pay now
                            </a>
                            )}
                        </p>
                </div>
                </div>
            </div>
      </Layout>
    );
  }
}

export default Success;