import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './layout';
import './home.scss';
import heroBackground from "/app/assets/images/hero_background.png";
import { getSessionAndCart } from "./cart_api.js";

class Home extends React.Component {
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
        <div className="intro-section" style={{ backgroundImage: `url(${heroBackground})`}}>
            <div className="container mybooks-container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-7 mx-auto text-center slogan-text" data-aos="fade-up">
                        <h1>Discover your next read</h1>
                        <p><a href="/browse_title" className="link">Browse</a> through our list and find books to fill your shelves.</p>
                        <p><a href="/mybooks" className="link">Sell</a> your already read books to someone who wants to read it.</p>
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
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})