import React from 'react';
import './layout.scss';
import logo from "/app/assets/images/bub_logo.png";
import fb_logo from "/app/assets/icons/fb_logo.svg";
import insta_logo from "/app/assets/icons/insta_logo.svg";
import twitter_logo from "/app/assets/icons/twitter_logo.svg";
import youtube_logo from "/app/assets/icons/youtube_logo.svg";


const Layout = (props) => {

    
    return (
        <React.Fragment>
        <header>
            <div className="container navbar-container">
                <nav className="navbar navbar-expand">
                    <div className="site-logo">
                        <img src={logo}></img>
                    </div>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a href="/" className="nav-link">Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="/my" className="nav-link">Sell</a>
                        </li>
                        <li className="nav-item ">
                            <a href="" className="nav-link">Orders</a>
                        </li>
                        <li className="nav-item dropdown">
                                <a href="" className="nav-link dropbtn dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    Buy <i class="fa fa-caret-down"></i>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li className="dropdown-item"><a href="" className="nav-link">Browse by Title/Author</a></li>
                                    <li className="dropdown-item"><a href="" className="nav-link">Browse by Genre</a></li>
                                </ul>
                        </li>
                        <li className="nav-item ">
                            <a href="" className="nav-link">FAQS</a>
                        </li>
                        <li className="nav-item ">
                            <a href="" className="nav-link">About</a>
                        </li>
                        <li className="nav-item log-in">
                            <a href="" className="nav-link">Login</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        {props.children}
      <footer>
        <div className="container">
            <div className="social-links">
                <p>Follow Us</p>
                <a><img src={fb_logo}></img></a>
                <a><img src={insta_logo}></img></a>
                <a><img src={twitter_logo}></img></a>
                <a><img src={youtube_logo}></img></a>
            </div>
            <p className="contact-footer">Email us at beforeusedbooks@gmail.com</p>
            <p className="copy">©2022 Before Used Books</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;