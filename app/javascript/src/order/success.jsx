import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "../layout";
import CheckIcon from '@mui/icons-material/Check';
import "./success.scss";
import { handleErrors, safeCredentials } from '../utils/fetchHelper';
import { emptyCart, getSessionAndCart } from "../cart_api.js";


class Success extends React.Component {
  state = {
    loading: true,
    authenticated: false,
    order: {},
    cart: []
  };

  componentDidMount() {
    fetch('/api/checkout/success')
    .then(handleErrors)
    .then(orderData => {
      return emptyCart()
        .then(cartData => {
          this.setState({
            authenticated: true,
            cart: cartData,
            order: orderData.order,
            loading: false,
          });
        });
    })
    .catch(error => {
      alert(`Server: ${error.message}`);
      if (error.message == 'Unauthorized') {
        window.location = '/';
      } else {
        window.location = '/orders';
      }
    });
  }

  render() {
    const { loading, order, authenticated, cart } = this.state;
    
    if (loading) {
      return <p>Loading...</p>;
    }

    const total_price = order.books.reduce((previous, book) => previous + book.price, 0);
    const timestamp = new Date(order.timestamp).toLocaleString();

    console.log(order);

    return (
      <Layout cartItems={cart.length} authenticated={authenticated}>
        <div className="container mybooks-container">
          <div className="row">
            <div className="col-4 mybooks-title">
              <h4 className="mb-1">Your order is confirmed!</h4>
              Order #{order.id}
            </div>
          </div>
          <div className="row mt-4 mb-4">
            {
              order.books.map(book => {
                return (
                  <div className="col-2 col-lg-4 mb-4 d-grid justify-content-center" key={`book-${book.id}`}>
                    <div>
                      <div
                        className="book-image mb-3"
                        style={{ backgroundImage: `url(${book.image_url})` }}
                      />
                    </div>
                    <div>
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
                <p className="text-uppercase text-center mt-4">
                  Amount: <span className='price-tag'>{total_price}$</span>
                </p>
                <p className="mb-4 text-success d-flex justify-content-center">
                  Paid on {timestamp} <CheckIcon/>
                </p>
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
