import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './layout';
import './faqs.scss';
import { getSessionAndCart } from "./cart_api.js";

class Faqs extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      cart: [],
    };
  }

  componentDidMount() {
    getSessionAndCart()
    .then(data => {
      this.setState({
        authenticated: data.authenticated,
        cart: data.cart,
      });
    });
  }

  render() {
    const { authenticated, cart } = this.state;
    return (
      <Layout cartItems={cart.length} authenticated={authenticated}>
        <div className="container mybooks-container">
            <div className="row mb-4 d-flex justify-content-center">
                <div className="col-8 mb-4 mybooks-title">
                  <h4 className="mb-1">FAQS</h4>
                  <div className="col-12 my-4 ">
                    <h5 className="mb-1">How can I buy a book?</h5>
                    <p>You just need to choose a book and click on the "buy" button, you're then directed to the payment plataform.</p>
                    <hr></hr>
                  </div>
                  <div className="col-12 my-4 ">
                    <h5 className="mb-1">How can I sell a book?</h5>
                    <p>You must upload a photo with a brief description of the book, you need to write in detail the actual state of the book, define a price and post it to the community.</p>
                  </div>
                </div>
            </div>
        </div>
      </Layout>
    )
    }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Faqs />,
    document.body.appendChild(document.createElement('div')),
  )
})