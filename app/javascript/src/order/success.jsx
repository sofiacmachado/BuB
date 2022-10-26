import React from "react";
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
    getSessionAndCart()
    fetch(`/api/orders/${this.props.order_id}`)
      .then(handleErrors)
      .then((data) => {
        this.setState({
          order: data.order,
          loading: false,
        });
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
    const { id, books, user } = order;

    return (
      <Layout cartItems={cart.length} authenticated={authenticated}>
        <div className="container mybooks-container">
            <div className="row">
                <div className="col-4 mybooks-title">
                    <h4 className="mb-1">Your order is confirmed! #{order.id}</h4>
                </div>
            </div>
            <div className="row mt-4 mb-4">
           { books.map((book) => {
              return (
                <div className="col-2 col-lg-4 mb-4 d-grid justify-content-center">
                  <div className="">
                      <div
                      className="book-image mb-3"
                      style={{ backgroundImage: `url(${book.image})` }}
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
                            <b>Seller: {book.user}</b>
                            </small>
                        </p>
                      </div>
                    </div>
                    )
                  }) }
                    <div className="col-2 col-lg-4 mb-4 for-sale-container">
                        <p className="for-sale rounded">
                        <p className="text-uppercase d-flex justify-content-center mt-4">
                        Amount:  
                        </p>
                        <span className='price-tag d-flex justify-content-center mb-4'>{order.total_price}$</span>
                            Payment Status:{" "}
                            {this.state.paid === true ? (
                                <span className="mb-4 text-success d-flex justify-content-center">Paid <CheckIcon/></span>
                            ) : (
                                <span className="mb-4 text-danger d-flex justify-content-center">Unpaid</span>
                            )}
                            {this.state.paid === true ? (
                            <a href="#" onClick={(e) => this.initiateStripeCheckout(e, id)} className="btn btn-success mb-2 d-none disabled pay-btn">
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