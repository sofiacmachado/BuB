import React from 'react';
import { Layout } from '../layout';
import LoginWidget from './loginWidget';
import SignupWidget from './signupWidget';
import './login.scss';
import { getSessionAndCart } from '../cart_api';

class Login extends React.Component {
  state = {
    authenticated: false,
    show_login: true,
    cart: [],
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
  
  toggle = () => {
    this.setState({
      show_login: !this.state.show_login,
    });
  };

  render () {
    const { authenticated, cart, show_login } = this.state;
    
     if (authenticated) {
      return (
        <Layout cartItems={cart.length} authenticated={authenticated}>
          <div className="container mybooks-container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="border p-4">
                  <p className="mb-0">You are already logged in 🙂</p>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    }
    return (
      <Layout>
        <div className="container mybooks-container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                {show_login ? <LoginWidget toggle={this.toggle} /> : <SignupWidget toggle={this.toggle} />}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Login;