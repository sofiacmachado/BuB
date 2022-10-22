import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './layout';
import './about.scss';
import { getSessionAndCart } from "./cart_api.js";

class About extends React.Component {
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
                  <h4 className="mb-1">About</h4>
                  <div className="col-12 my-4 ">
                    <p>Before Used Books is a company that believes in a more sustainable planet.
                    Every book enthusiast has books that are on the shelves collecting dust, books that they're not going to read again. Instead of having those books taking up space, they can be sold here for an honest price to someone who's in search for that book.
                    </p>
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
    <About />,
    document.body.appendChild(document.createElement('div')),
  )
})