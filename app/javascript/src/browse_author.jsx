import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './browse.scss';
import { Layout } from './layout';
import SearchBar from "./searchBar/SearchBarAuthor";
import data from "./data.js";


class BrowseAuthor extends React.Component {
  
  render() {
    const  book  = data; 
    return (
      <Layout>
        <div className="container mybooks-container">
            <div className="row mb-4 d-flex justify-content-center">
                <div className="col-8 mb-4 mybooks-title">
                  <h4 className="mb-1">Search</h4>
                  <div className="col-12 my-4 ">
                   <SearchBar
                    placeholder='Enter a Book Author' data={book}/>
                  </div>
                </div>
            </div>
        </div>

      <div className="container lastbooks-container">
          <hr />
        <div className="see-all">
          <h2>Latest Uploaded Books</h2>
          <a><h3>See all</h3></a>
        </div>

        <div key={book.id} className="col-6 col-lg-4 mb-4 d-inline-flex lastbooks">
        {book.map((book) => {
          return(
              <a href={`/book/${book.id}`} className="latestbook text-body text-decoration-none">
                <div className="book-image mb-1 rounded" style={{ backgroundImage: `url(${book.image_url})` }} />
                <p className="text-uppercase mb-0 text-secondary"><small><b>{book.author}</b></small></p>
                <h6 className="mb-0">{book.title}</h6>
                <p className="mb-0"><small>${book.price}</small></p>
              </a>
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
    <BrowseAuthor />,
    document.body.appendChild(document.createElement('div')),
  )
})