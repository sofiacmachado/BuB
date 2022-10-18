import React from 'react';
import { Layout } from './layout';
import ReactDOM from 'react-dom';
import './mybooks.scss'
import data from "./data.js";
import {isLoggedIn} from './login_api';
import { getCartFromServer } from "./cart_api.js";

class Mybooks extends React.Component {
    
    constructor(props) {
        super(props);
        this.state =   {
            authenticated: false,
            editing: false,
            cart: [],
        }
    }
    
    //fetch
    componentDidMount() {
        const logIn = isLoggedIn();
        const cart = getCartFromServer();
        this.setState({
          cart: cart,
          authenticated: logIn,
          editing: false,
  
        });
      }

    render() {
        const { cart, authenticated } = this.state;
        const book = data;

        if (authenticated === false) {
            return (
                <Layout cartItems={cart.length} authenticated={authenticated}>
                    <div className="container mybooks-container">
                        <div className="row">
                            <div className="col-10 mybooks-title">
                                <h4 className="mb-1">My Books</h4>
                            </div>
                        </div>
                        <div className="col-12 my-4">
                            <div className="border border-light rounded shadow-sm p-4">
                                <p className="mb-0">
                                Please{" "}
                                <a href="/login" className="login-link">
                                    log in
                                </a>{" "}
                                to see your books.
                                </p>
                            </div>
                        </div>
                    </div>
                </Layout>
            );
        }
        return (
            <Layout cartItems={cart.length} authenticated={authenticated}>
                <div className="container mybooks-container">
                    <div className="row">
                        <div className="col-4 mybooks-title">
                            <h4 className="mb-1">My Books</h4>
                            <p className="text-secondary mb-3">
                                Sell your stories to someone who will read them
                            </p>
                        </div>
                        <div className="col-2">
                            <a href="/mybooks/add" className="btn btn-add mt-3">
                                Add book
                            </a>
                        </div>
                    </div>
                    <div key={book.id} className="row mt-4 mb-4">
                        {book.map((book) => {
                            return(
                                <a href={`/book/${book.id}`} className="latestbook text-body text-decoration-none">
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
                                            Price: <span className='price-tag'>{book.price}$</span>
                                            </p>
                                        </div>
                                        <div className="col-8 col-lg-6 mb-4 third-column">
                                        <small className="text-secondary">Book's condition:</small>
                                        <p className="text-secondary condition">
                                            {book.condition}
                                        </p>
                                        <small className="text-secondary">Detailed Condition:</small>
                                        <p className="text-secondary condition">
                                            {book.condition_description}
                                        </p>
                                        <p className="mb-0 text-secondary">
                                            {book.description}
                                        </p>
                                        </div>
                                        <div className="col-4 col-lg-2 mb-4 d-grid for-sale-container">
                                            <p className="for-sale rounded">
                                                For Sale
                                            </p>
                                            <a href={`mybooks/edit/${book.id}`} 
                                            className="btn btn-edit  mt-3"
                                            >
                                            Edit book
                                            </a>
                                    </div>
                                    </div>
                                </a>
                            )})}
                    </div>
                    <hr />
                </div>
            </Layout>
        )

    }

}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <Mybooks />,
        document.body.appendChild(document.createElement("div"))
    );
});