import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './layout';

import "./orders.scss";


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


class Orders extends React.Component {
 
 
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
    return (
      <Layout>
        <div className="container mybooks-container">
                    <div className="row">
                        <div className="col-4 mybooks-title">
                            <h4 className="mb-1">Sold Books</h4>
                        </div>
                    </div>
        </div>


        <div className="container pt-4">
          <h4 className="mb-1">Orders</h4>
          <p className="text-secondary mb-3">
            Explore some of the best-reviewed stays in the world
          </p>
          {authenticated === true ? (
            <div className="row">
              {loading === true ? (
                <p>Loading...</p>
              ) : (
                <div className="col list-group">
                  {bookings.length !== 0 ? (
                    bookings.map((booking) => {
                      return (
                        <a
                          href={`booking/${booking.id}/success`}
                          key={booking.id}
                          class="list-group-item list-group-item-action"
                        >
                          <div className="row">
                            <div
                              className="col-3 property-image mb-1 rounded"
                              style={{
                                backgroundImage: `url(${booking.image_url})`,
                              }}
                            />
                            <div className="col-9">
                              <h6>
                                {booking.title}{" "}
                                <small>({booking.start_date}</small> -{" "}
                                <small>{booking.end_date})</small>
                              </h6>
                              <p>
                                Payment status:{" "}
                                {booking.paid === true ? (
                                  <small className="ms-1 text-success">
                                    <b>Paid</b>
                                  </small>
                                ) : (
                                  <small className="ms-1 text-danger">
                                    <b>Pending</b>
                                  </small>
                                )}
                              </p>
                              <p>
                                <b>
                                  Total:{" "}
                                  {booking.charges.length !== 0 ? (
                                    <span>${booking.charges[0].amount}</span>
                                  ) : (
                                    <span>N/A</span>
                                  )}
                                </b>
                              </p>
                            </div>
                          </div>
                        </a>
                      );
                    })
                  ) : (
                    <div className="col-12 my-4">
                      <h6>You do not have any upcoming bookings</h6>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="col-12 my-4">
              <div className="border p-4">
                <p className="mb-0">
                  Please{" "}
                  <a href={`/login?redirect_url=${window.location.pathname}`}>
                    log in
                  </a>{" "}
                  to see your upcoming trips.
                </p>
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Orders />,
    document.body.appendChild(document.createElement("div"))
  );
});