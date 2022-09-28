import React from 'react';
import Layout from './layout';
import ReactDOM from 'react-dom';
import './mybooks.scss'
import bookCover from '/app/assets/images/book_cover.jpg';

const book = [
    {
      title: 'Anna Karenina',
      author: "Leo Tolstoy",
      isbn: '9780140449174',
      description: "Anna Karenina seems to have everything - beauty, wealth, popularity and an adored son. But she feels that her life is empty until the moment she encounters the impetuous officer Count Vronsky. Their subsequent affair scandalizes society and family alike and soon brings jealously and bitterness in its wake. Contrasting with this tale of love and self-destruction is the vividly observed story of Levin, a man striving to find contentment and a meaning to his life - and also a self-portrait of Tolstoy himself.",
      condition: "Used",
      user_description: 'Spine has some folds',
      genre: 'classic',
      price: 4,
      rating: 4.08/5,
      image_url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1426930853l/153.jpg',
      user: 1
    },
    {
      title: 'Notes from Underground',
      author: "Fyodor Dostoevsky",
      isbn: '9780679734529',
      description: "Notes from Underground is a novella written in 1864 by Fyodor Dostoevsky, and is considered by many to be one of the first existentialist novels. The novella presents itself as an excerpt from the rambling memoirs of a bitter, isolated, unnamed narrator, who is a retired civil servant living in St. Petersburg.",
      condition: "Like new",
      user_description: 'Book is in perfect conditions',
      genre: 'classic',
      price: 8,
      rating: 4.2/5,
      image_url: 'https://images-na.ssl-images-amazon.com/images/I/41kxGhOH0vL._SX322_BO1,204,203,200_.jpg',
      user: 1
    }
  ]

class Mybooks extends React.Component {
    
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

        const { authenticated } = this.state;

        if (authenticated === false) {
            return (
                <Layout>
                    <div className="container mybooks-container">
                        <div className="row">
                            <div className="col-10 mybooks-title">
                                <h4 className="mb-1">My Books</h4>
                            </div>
                        </div>
                        <div className="col-12 my-4">
                            <div className="border border-light rounded shadow-sm p-4">
                                <p className="mb-0">
                                Please{" "}
                                <a href="">
                                    log in
                                </a>{" "}
                                to see your books.
                                </p>
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
                        <div className="col-4 mybooks-title">
                            <h4 className="mb-1">My Books</h4>
                            <p className="text-secondary mb-3">
                                Sell your stories to someone who will read them
                            </p>
                        </div>
                        <div className="col-2">
                            <a href="/mybooks/add" className="btn btn-add mt-3">
                                Add book
                            </a>
                        </div>
                    </div>
                    <div key={book.id} className="row mt-4 mb-4">
                        {book.map((book) => {
                            return(
                                /* <div className="row">
                                <div className="col col-lg-2 mb-4">
                                    <a
                                        href='#'
                                        className=""
                                    >
                                    <div
                                        className="book-image rounded"
                                        style={{ backgroundImage: `url(${bookCover})` }}
                                    />
                                        </a>
                                </div>
                                    <div className="col-6 col-lg-2 mb-4 d-grid align-items-center">
                                            <p className="text-uppercase mb-2 text-secondary">
                                            <small>
                                                <b>Book's Author</b>
                                            </small>
                                            </p>
                                            <h6 className="mb-2">Book Title</h6>
                                            <p className="mb-1">
                                            <small>Genre</small>
                                            </p>
                                            <p className="text-uppercase mb-4 text-secondary">Price: <span>8$</span></p>
                                    </div>
                                    <div className="col-6 col-lg-4 mb-4 d-grid align-items-center">
                                            <p className="text-uppercase mb-0 text-secondary">
                                                Book Condition
                                            </p>
                                            <p className="text-uppercase mb-0 text-secondary">
                                                Book Description
                                            </p>
                                            
                                    </div>
                                    <div className="col-6 col-lg-4 mb-4 d-grid for-sale-container">
                                            <p className="for-sale rounded">
                                                For Sale
                                            </p>
                                            <a href="#" className="btn btn-edit mt-3">
                                                See book
                                            </a>
                                    </div>
                                </div> */
                                <a href={`/book/${book.id}`} className="latestbook text-body text-decoration-none">
                                    <div className="row mt-4 mb-4">
                                    <div className="col col-lg-2 mb-4">
                                        <div
                                        className="book-image mb-3"
                                        style={{ backgroundImage: `url(${book.image_url})` }}
                                        />
                                    </div>
                                        <div className="col-6 col-lg-2 mb-4">
                                        <h6 className="mb-2 text-uppercase">"{book.title}"</h6>
                                        <p className="text-uppercase mb-1 text-secondary">
                                            <small>
                                            <b>{book.author}</b>
                                            </small>
                                        </p>
                                        <p className="text-uppercase mb-4 text-secondary">
                                            <small>
                                            <b>{book.genre}</b>
                                            </small>
                                        </p>
                                        <p className="text-uppercase mb-4 text-secondary">
                                            <small>
                                            <b>ISBN: {book.isbn}</b>
                                            </small>
                                        </p>
                                        <p className="text-uppercase mb-4 price-tag-title">
                                            Price: <span className='price-tag'>{book.price}$</span></p>
                                        <p>
                                        </p>
                                        </div>
                                        <div className="col-8 col-lg-6 mb-4 third-column">
                                        <small className="text-secondary">Book's condition:</small>
                                        <p className="text-secondary condition">
                                            {book.condition}
                                        </p>
                                        <small className="text-secondary">Detailed Condition:</small>
                                        <p className="text-secondary condition">
                                            {book.user_description}
                                        </p>
                                        <p className="mb-0 text-secondary">
                                            {book.description}
                                        </p>
                                        </div>
                                        <div className="col-4 col-lg-2 mb-4 d-grid for-sale-container">
                                            <p className="for-sale rounded">
                                                {/* who's selling */}
                                                For Sale
                                            </p>
                                        {this.state.authenticated.user == book.user.id ? (
                                            <button
                                            className="btn btn-edit  mt-3"
                                            //  onClick={((e) => e, this.editMode)}
                                            >
                                            Edit book
                                            </button>
                                        ) : null}
                                    </div>
                                        {/* <div className="col-6 col-lg-4 mb-4 for-sale-container">
                                            <p className="for-sale rounded">
                                                For Sale
                                            </p>
                                        </div>  */}
                                    </div>
                                </a>
                            )})}
                    </div>
                    <hr />
                </div>
            </Layout>
        )

    }

}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <Mybooks />,
        document.body.appendChild(document.createElement("div"))
    );
});