import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import './browse.scss';
import SearchBar from "./Components/SearchBar";
import BookData from "./Data.json";

class Browse extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container mybooks-container">
            <div className="row mb-4 d-flex justify-content-center">
                <div className="col-8 mb-4 mybooks-title">
                  <h4 className="mb-1">Search</h4>
                  <div className="col-12 my-4 ">
                    <SearchBar 
                    placeholder="Enter a Book Name..." data={BookData}/>
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
    <Browse />,
    document.body.appendChild(document.createElement('div')),
  )
})