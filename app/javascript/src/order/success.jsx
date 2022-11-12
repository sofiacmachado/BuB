import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "../layout";
import CheckIcon from '@mui/icons-material/Check';
import "./success.scss";
import { handleErrors, safeCredentials } from '../utils/fetchHelper';
import { getSessionAndCart } from "../cart_api.js";


class Success extends React.Component {
  state = {
    loading: true,
    authenticated: false,
    order: {},
    cart: []
  };

  componentDidMount() {
    fetch('/api/orders/success')
    .then(handleErrors)
    .then(data => {
      this.setState({
        order: data.order,
        loading: false,
      });
    })
    .catch(error => {
      console.log(error);
      alert(`Server: ${error.error}`);
      window.location = '/orders';
    });

    getSessionAndCart()
    .then(data => {
      this.setState({
        authenticated: data.authenticated,
        cart: data.cart,
      });
    });
  }

  initiateStripeCheckout = (e, order_id) => {
    e.preventDefault();
    return fetch(
      `/api/charges?order_id=${order_id}&cancel_url=${window.location.pathname}`,
      safeCredentials({
        method: "POST",
      })
    )
      .then(handleErrors)
      .then((response) => {
        const stripe = Stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

        stripe
          .redirectToCheckout({
            sessionId: response.charge.checkout_session_id,
          })
          .then((result) => {});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { loading, order, authenticated, cart } = this.state;
    
    if (loading) {
      return <p>Loading...</p>;
    }

    const total_price = order.books.reduce((previous, book) => { previous + book.price }, 0);

    console.log(order);

    return (
      <Layout cartItems={cart.length} authenticated={authenticated}>
        <div className="container mybooks-container">
          <div className="row">
            <div className="col-4 mybooks-title">
              <h4 className="mb-1">Your order #{order.id} is confirmed!</h4>
            </div>
          </div>
          <div className="row mt-4 mb-4">
            {
              order.books.map(book => {
                return (
                  <div className="col-2 col-lg-4 mb-4 d-grid justify-content-center">
                    <div className="">
                      <div
                        className="book-image mb-3"
                        style={{ backgroundImage: `url(${book.image_url})` }}
                      />
                    </div>
                    <div className="">
                      <h6 className="mb-2 text-uppercase">"{book.title}"</h6>
                      <p className="text-uppercase mb-1 text-secondary">
                        <small>
                          <b>{book.author}</b>
                        </small>
                      </p>
                      <p className="text-uppercase mb-4 text-secondary">
                        <small>
                          <b>ISBN: {book.isbn}</b>
                        </small>
                      </p>
                      <p className="text-uppercase mb-4 text-secondary">
                        <small>
                          <b>Seller: {book.seller.username}</b>
                        </small>
                      </p>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className="row mt-4 mb-4">
            <div className="col-2 col-lg-4 mb-4 for-sale-container">
              <div className="for-sale rounded">
                <p className="text-uppercase d-flex justify-content-center mt-4">
                  Amount:  
                </p>
                <span className='price-tag d-flex justify-content-center mb-4'>
                  {total_price}$
                </span>
                <span className="mb-4 text-success d-flex justify-content-center">
                  Paid on {order.timestamp} <CheckIcon/>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}


document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Success />,
    document.body.appendChild(document.createElement("div"))
  );
});
