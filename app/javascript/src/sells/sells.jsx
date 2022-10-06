import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "../layout";

import "./sells.scss";

const BOOKSTORE = [
  {
    id: 1,
    title: 'Anna Karenina',
    author: "Leo Tolstoy",
    isbn: '9780140449174',
    description: "Anna Karenina seems to have everything - beauty, wealth, popularity and an adored son. But she feels that her life is empty until the moment she encounters the impetuous officer Count Vronsky. Their subsequent affair scandalizes society and family alike and soon brings jealously and bitterness in its wake. Contrasting with this tale of love and self-destruction is the vividly observed story of Levin, a man striving to find contentment and a meaning to his life - and also a self-portrait of Tolstoy himself.",
    condition: "Used",
    user_description: 'Spine has some folds',
    genre: 'classic',
    price: 4,
    rating: 4.08/5,
    image_url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1426930853l/153.jpg',
    user: 1,
    buyer: 'Tom',
    order_status: 'shipping'
  },
  {
    id: 2,
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
    user: 1,
    buyer: 'Sam',
    order_status: 'delievering'
  }
]

class Sells extends React.Component {

  constructor(props) {
    super(props);
    this.state =   {
      id:'',
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
      buyer: '',
      order_status: 'shipping',
      loading: true,
      authenticated: false,
      editing: false,
      }
    }

//fetch
  componentDidMount() {
    let data = {
      book:  BOOKSTORE[0],
    }

    this.setState({
      loading: false,
      id: data.book.id,
      author: data.book.author,
      title: data.book.title,
      description: data.book.description,
      user_description: data.book.user_description,
      condition: data.book.condition,
      genre: data.book.genre,
      price: data.book.price,
      isbn: data.book.isbn,
      rating: data.book.rating,
      image_url: data.book.image_url,
      user: data.book.user,
      order_status: data.book.order_status,
      buyer: data.book.buyer,
      loading: true,
      authenticated: false,
      editing: false,

    });
    //fetch
    data = true;
    this.setState({
      authenticated: data,
      loading: false,
    });
}

  render() {
    

    if (this.state.loading) {
      return <p>Loading...</p>;
    }

    return (
      <Layout>
        <div className="container mybooks-container">
                    <div className="row">
                        <div className="col-4 mybooks-title">
                            <h4 className="mb-1">Sold Books</h4>
                        </div>
                    </div>
            <div className="row mt-4 mb-4">
                <div className="col col-lg-2 mb-4">
                    <div
                    className="book-image mb-3"
                    style={{ backgroundImage: `url(${this.state.image_url})` }}
                    />
                </div>
                    <div className="col-8 col-lg-4 mb-4">
                    <h6 className="mb-2 text-uppercase">"{this.state.title}"</h6>
                    <p className="text-uppercase mb-1 text-secondary">
                        <small>
                        <b>{this.state.author}</b>
                        </small>
                    </p>
                    <p className="text-uppercase mb-4 text-secondary">
                        <small>
                        <b>ISBN: {this.state.isbn}</b>
                        </small>
                    </p>
                    <p className="text-uppercase mb-4 text-secondary">
                        <b>Bought by: {this.state.buyer}</b>
                    </p>
                    </div>
                    <div className="col-8 col-lg-6 mb-4 d-grid for-sale-container">
                        <p className="for-sale rounded">
                        <p className="text-uppercase d-flex justify-content-center mt-4">
                        Amount: 
                        </p>
                        <span className='price-tag d-flex justify-content-center mb-4'>{this.state.price}$</span>
                            <span className='d-flex justify-content-center'>Order status:{" "}</span>
                            {this.state.order_status === 'complete' ? (
                                <span className="mb-4 text-success d-flex justify-content-center">Complete <CheckIcon/></span>
                            ) : this.state.order_status === 'delievering' ? (
                                <span className="mb-4 text-danger d-flex justify-content-center">Delievering</span>
                            ) : ( <span className="mb-4 text-danger d-flex justify-content-center">Shipping</span> )
                            }
                            <div class="dropdown">
                              <button class="btn btn-add dropdown-toggle mb-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Change Order Status
                              </button>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#" value="pending">Shipping</a>
                                <a class="dropdown-item" href="#" value="shipped">Delievering</a>
                              </div>
                            </div>
                        </p>
                </div>
                </div>
            </div>
      </Layout>
    );
  }
}

export default Sells;