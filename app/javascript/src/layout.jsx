import React , { useState } from 'react';
import './layout.scss';
import logo from "/app/assets/images/bub_logo.png";
import fb_logo from "/app/assets/icons/fb_logo.svg";
import insta_logo from "/app/assets/icons/insta_logo.svg";
import twitter_logo from "/app/assets/icons/twitter_logo.svg";
import youtube_logo from "/app/assets/icons/youtube_logo.svg";

export class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          authenticated: true,
          sessionId: 0,
          loginClassName: "",
          logoutClassName: "d-none",
          browseAuthor: true,
          isNavCollapse: false,
        };
    
        this.doLogout = this.doLogout.bind(this);
        this.handleBrowseAuthor = this.handleBrowseAuthor.bind(this);
        this.handleBrowseTitle = this.handleBrowseTitle.bind(this);
        this.handleNavCollapse = this.handleNavCollapse.bind(this);
        this.checkNavCollapse = this.checkNavCollapse.bind(this);
        
      }


      componentDidMount() {
        // fetch
        let data = {
            authenticated: true,
            sessionId: 0,
            loginClassName: "",
            logoutClassName: "d-none",
            browseAuthor: true,
            isNavCollapse: false,
        };
            this.setState({
              browseAuthor: data.authenticated,
              isNavCollapse: data.authenticated,
              authenticated: data.authenticated,
              sessionId: data.sessionId,
              loginClassName : data.authenticated ? "d-none" : "nav-item log-in",
              logoutClassName : data.authenticated ? "nav-item log-in" : "d-none",
            })
      }

      doLogout(e) {
          this.setState({
            authenticated: false,
            sessionId: 0,
            loginClassName : "",
            logoutClassName : "d-none",
          })
        return false;
      }

      handleBrowseAuthor() {
        this.state.browseAuthor = true
        };
        handleBrowseTitle() {
            this.state.browseAuthor = false
        };

      handleNavCollapse() {
        this.state.isNavCollapse = !this.state.isNavCollpase
      };

      checkNavCollapse() {
        if (this.state.isNavCollapse) {
            return 'collapse'
        } else {
            return ''
        }
      }
      
      render() {

            return (
                <React.Fragment>
                    <header>
                        <div className="container navbar-container">
                            <nav className="navbar navbar-expand-sm">
                                <div className="container-fluid">
                                    <a href="/" className="site-logo">
                                        <img src={logo}></img>
                                    </a>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={this.handleNavCollapse} aria-label="Toggle navigation" onClick={this.handleNavCollapse}>
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <ul className={`${this.checkNavCollapse()} navbar-collapse`} id="navbarToggleExternalContent">
                                        {/* <li className="nav-item">
                                            <a href="/" className="nav--link">Home</a>
                                        </li> */}
                                        <li className="nav-item">
                                            <a href="/mybooks" className="nav--link">Sell</a>
                                        </li>
                                        <li className="nav-item dropdown">
                                                <a href="" className="nav--link dropbtn dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Buy <i className="fa fa-caret-down"></i>
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <li className="dropdown-item"><a href="/browse_title" onClick={this.handleBrowseTitle} className="nav--link">Browse by Title</a></li>
                                                    <li className="dropdown-item"><a href="/browse_author" onClick={this.handleBrowseAuthor} className="nav--link">Browse by Author</a></li>
                                                </ul>
                                        </li>
                                        <li className="nav-item ">
                                            <a href="/faqs" className="nav--link">FAQS</a>
                                        </li>
                                        <li className="nav-item ">
                                            <a href="/about" className="nav--link">About</a>
                                        </li>
                                        <li className="nav-item dropdown">
                                                <a href="" className="nav--link dropbtn dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Account <i className="fa fa-caret-down"></i>
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <li className="dropdown-item"><a href="/cart" className="nav--link">Cart{' '}
                                                    {this.countCartItems ? (
                                                        <button className="cart-indicator">{this.countCartItems}</button>
                                                    ) : (
                                                        ''
                                                    )}</a></li>
                                                    <li className="dropdown-item"><a href="/orders" className="nav--link">Orders</a></li>
                                                    <li className="dropdown-item"><a href="/sells" className="nav--link">Sells</a></li>
                                                    <li className="dropdown-item"><a href="/mybooks" className="nav--link">Your Books</a></li>
                                                </ul>
                                        </li>
                                        <li className={this.state.loginClassName} >
                                            <a className="nav--link log-in" href="/login">
                                            Log in
                                        </a>
                                        </li>
                                        <li className={this.state.logoutClassName} >
                                            <a className="nav--link log-out" href="/" onClick={this.doLogout}>
                                            Log out
                                        </a>
                                        </li>
                                        {/* <li className="nav-item log-in">
                                            <a href="/login" className="nav--link">Login</a>
                                        </li> */}
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </header>
                    {this.props.children}
                <footer>
                    <div className="container footer">
                        <div className="social-links">
                            <p>Follow Us</p>
                            <a className="src_social"><img src={fb_logo}></img></a>
                            <a className="src_social"><img src={insta_logo}></img></a>
                            <a className="src_social"><img src={twitter_logo}></img></a>
                            <a className="src_social"><img src={youtube_logo}></img></a>
                        </div>
                        <p className="contact-footer">Email us at beforeusedbooks@gmail.com</p>
                        <p className="copy">©2022 Before Used Books</p>
                    </div>
                </footer>
            </React.Fragment>
            );
        }
    }


