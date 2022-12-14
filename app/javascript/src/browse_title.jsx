import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './browse.scss';
import { Layout } from './layout';
import SearchBar from "./searchBar/SearchBarTitle";
import { handleErrors } from './utils/fetchHelper';
import { getSessionAndCart } from './cart_api';

//removed cart and authenticated boolean

class BrowseTitle extends React.Component {
  state = {
    authenticated: false,
    cart: [],
    books: [],
    total_pages: null,
    next_page: null,
    loading: true,
    nextPageClass: "lastbooks-container d-inline-flex justify-content-between",
  }
 
  componentDidMount() {
    getSessionAndCart()
    .then(data => {
      this.setState({
        authenticated: data.authenticated,
        cart: data.cart,
      });
    });
   
    fetch('/api/books?page=1')
    .then(handleErrors)
      .then(data => {
        this.setState({
          books: data.books,
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
          nextPageClass : data.next_page ? "lastbooks-container d-inline-flex justify-content-between" : "ms-4",
        })
      })
  }

  loadMore = () => {
      if (this.state.next_page === null) {
        return;
      }
      this.setState({ loading: true });
      fetch(`/api/books?page=${this.state.next_page}`)
        .then(handleErrors)
        .then(data => {
          this.setState({
            books: this.state.books.concat(data.books),
            total_pages: data.total_pages,
            next_page: data.next_page,
            loading: false,
            nextPageClass : data.next_page ? "lastbooks-container d-inline-flex justify-content-between" : "ms-4",
          })
        })
  }

  render() {
    const { authenticated, cart, nextPageClass, books, next_page, loading } = this.state;
    return (
      <Layout cartItems={cart.length} authenticated={authenticated}>
        <div className="container mybooks-container">
            <div className="row mb-4 d-flex justify-content-center">
                <div className="col-8 mb-4 mybooks-title">
                  <h4 className="mb-1">Search</h4>
                  <div className="col-12 my-4 ">
                   <SearchBar
                    placeholder='Enter a Book Title' data={books}/>
                  </div>
                </div>
            </div>
        </div>

      <div className="container">
          <hr />
          {loading && <p>loading...</p>}
          {(loading || next_page === null) ||
            <div className="see-more">
              <h2>Latest Uploaded Books</h2>
              <button className="see-more" onClick={this.loadMore}>See More</button>
            </div>
            }
        <div className={nextPageClass}>
          {books.map((book) => {
            return(
              <div key={book.id} className="col-2 mb-4 d-inline-flex justify-content-center latestbooks">
                <a href={`/book/${book.id}`} className="text-body text-decoration-none">
                  <div className="book-image mb-1 rounded" style={{ backgroundImage: `url(${book.image_url})` }} />
                  <p className="text-uppercase mb-0 text-secondary"><small><b>{book.author}</b></small></p>
                  <h6 className="mb-0">{book.title}</h6>
                  <p className="mb-0"><small>${book.price}</small></p>
                </a>
              </div>
            )
          })}
        </div>
      </div>
      </Layout>
    )
    }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowseTitle />,
    document.body.appendChild(document.createElement('div')),
  )
})