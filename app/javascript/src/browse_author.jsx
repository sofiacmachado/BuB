import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Layout, {browseAuthor} from './layout';
import './browse.scss';
import SearchBar from "./searchBar/SearchBarAuthor";
import BookData from "./Data.json";

const book = [
  {
    title: 'Notes from Underground',
    author: "Leo Tolstoy",
    isbn: '9780140449174',
    description: "Anna Karenina seems to have everything - beauty, wealth, popularity and an adored son. But she feels that her life is empty until the moment she encounters the impetuous officer Count Vronsky. Their subsequent affair scandalizes society and family alike and soon brings jealously and bitterness in its wake. Contrasting with this tale of love and self-destruction is the vividly observed story of Levin, a man striving to find contentment and a meaning to his life - and also a self-portrait of Tolstoy himself.",
    condition: "Used",
    user_description: 'Spine has some folds',
    genre: 'classic',
    price: 4,
    rating: 4.08/5,
    image_url: 'https://images-na.ssl-images-amazon.com/images/I/41kxGhOH0vL._SX322_BO1,204,203,200_.jpg',
    user: 1
  },
  {
    title: 'Anna Karenina',
    author: "Fyodor Dostoevsky",
    isbn: '9780679734529',
    description: "Notes from Underground is a novella written in 1864 by Fyodor Dostoevsky, and is considered by many to be one of the first existentialist novels. The novella presents itself as an excerpt from the rambling memoirs of a bitter, isolated, unnamed narrator, who is a retired civil servant living in St. Petersburg.",
    condition: "Like new",
    user_description: 'Book is in perfect conditions',
    genre: 'classic',
    price: 8,
    rating: 4.2/5,
    image_url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1426930853l/153.jpg',
    user: 1
  }
]

class BrowseAuthor extends React.Component {

    constructor(props) {
      super(props);
      this.state =   {
          title: '',
          author: '',
          description: '',
          isbn: '',
          condition: '',
          user_description: '',
          genre: '',
          price: '',
          rating: '',
          image_url: '',
          user: '',
          loading: true,
          authenticated: false,
          editing: false,
          }
        }

  //fetch
    componentDidMount() {
      let data = {
        book: [],
      }

      this.setState({
        loading: false,
        id: data.book.id,
        author: data.book.author,
        title: data.book.title,
        description: data.book.description,
        user_description: data.book.user_description,
        condition: data.book.condition,
        genre: data.book.genre,
        price: data.book.price,
        isbn: data.book.isbn,
        rating: data.book.rating,
        image_url: data.book.image_url,
        user: data.book.user,
        loading: true,
        authenticated: false,
        editing: false,
      });
      //fetch
      data = true;
      this.setState({
        authenticated: data,
      });
    }

  render() {
    return (
      <Layout>
        <div className="container mybooks-container">
            <div className="row mb-4 d-flex justify-content-center">
                <div className="col-8 mb-4 mybooks-title">
                  <h4 className="mb-1">Search</h4>
                  <div className="col-12 my-4 ">
                   <SearchBar
                    placeholder='Enter a Book Author' data={BookData}/>
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