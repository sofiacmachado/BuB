import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "../layout";
import { handleErrors, safeCredentials } from "@utils/fetchHelper";

import "./success.scss";


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
          user: 1
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
          user: 1
        }
      ]
      
    class Success extends React.Component {
      
        constructor(props) {
              super(props);
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
      
        //fetch
            componentDidMount() {
              let data = {
                book:  BOOKSTORE[0],
              }
      
              this.setState({
                loading: false,
      
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
                loading: true,
                authenticated: false,
                editing: false,
      
              });
              //fetch
              data = true;
              this.setState({
                authenticated: data,
                loading: true,
              });
        }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <Layout>
        <div className="container pt-4">
          <div className="row">
            <div className="col-12 my-4">
              <div className="card-body border rounded px-4">
                <h1 className="card-title text-center mb-3">
                  You're order is confirmed
                </h1>
                <h2 className="card-title text-center mb-3">
                  {this.state.title}
                </h>
                <div className="row">
                  <div
                    className="col-6 property-image border rounded mb-3"
                    style={{ backgroundImage: `url(${this.state.image_url})` }}
                  />
                  <div className="col-6">
                    <h5 className="mb-1">{this.state.author}</h5>
                    <p className="card-text text-uppercase mb-2 text-secondary">
                      <small>Sold by: {this.state.user}</small>
                      <br />
                      <small>Price: {this.state.price}</small>
                    </p>
                   
                    <p className="card-text mt-2 mb-4 text-justify">
                      {property.description}
                    </p>
                    <h2 className="mt-4">
                      Payment Status:{" "}
                      {booking.paid === true ? (
                        <span className="ms-2 text-success">Paid</span>
                      ) : (
                        <span className="ms-2 text-danger">Unpaid</span>
                      )}
                    </h2>
                    <h2>Amount: $ {charges[0].amount}</h2>
                    {booking.paid === true ? (
                      <a href="#" className="btn btn-success d-none disabled pay-btn">
                        Pay now
                      </a>
                    ) : (
                      <a
                        href=""
                        onClick={(e) => this.initiateStripeCheckout(e, id)}
                        className="btn btn-primary text-white pay-btn"
                      >
                        Pay now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Success;