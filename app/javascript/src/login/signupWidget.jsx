// signupWidget.jsx
import React from 'react';
import { doLogIn, doSignup } from '../login_api';

class SignupWidget extends React.Component {
  state = {
    email: '',
    password: '',
    username: '',
    error: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  signup = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({ error: '' });

    const {username, email, password} = this.state;
    doSignup(username, email, password)
    .then(() => {
      return doLogIn(email, password);
    })
    .then(data => {
      if (data.success) {
        const params = new URLSearchParams(window.location.search);
        const redirect_url = params.get('redirect_url') || '/';
        window.location = redirect_url;
      }
    })
    .catch(error => {
      this.setState({ error: `Could not sign up: ${error}` });
    });
  }

  render () {
    const { email, password, username, error } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.signup}>
          <input name="username" type="text" className="form-control form-control-lg mb-3" placeholder="Username" value={username} onChange={this.handleChange} required />
          <input name="email" type="text" className="form-control form-control-lg mb-3" placeholder="Email" value={email} onChange={this.handleChange} required />
          <input name="password" type="password" className="form-control form-control-lg mb-3" placeholder="Password" value={password} onChange={this.handleChange} required />
          <button type="submit" className="btn btn-login btn-block btn-lg">Sign up</button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
        <hr/>
        <p className="mb-0">Already have an account? <a className="text-primary" id="link" onClick={this.props.toggle}>Log in</a></p>
      </React.Fragment>
    )
  }
}

export default SignupWidget;