import React from 'react';
import { Layout } from '../layout';
import LoginWidget from './loginWidget';
import SignupWidget from './signupWidget';
import './login.scss'

const login1 = {
    authenticated: false,
    show_login: true,
}

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state =   {
            authenticated: false,
            show_login: true,
            }
          }

  componentDidMount() {
    let data = {
        login: login1,
      }
    
      data = true;
      this.setState({
        authenticated: data,
      });
  }
 toggle = () => {
    this.setState({
      show_login: !this.state.show_login,
    })
  }

  render () {
    const { authenticated, show_login } = this.state;
    /* if (authenticated) {
      return (
        <Layout>
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
    }; */

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