import React from 'react';
import Layout from './layout';
import ReactDOM from 'react-dom';
import './mybooks.scss'
import bookCover from '/app/assets/images/book_cover.jpg';

class Mybooks extends React.Component {
    
    state = {
        authenticated: true,
    };

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
                        <div className="col-10 mybooks-title">
                            <h4 className="mb-1">My Books</h4>
                            <p className="text-secondary mb-3">
                                Find guests for your properties all around the world
                            </p>
                        </div>
                        <div className="col-2">
                            <a href="#" className="btn btn-add mt-3">
                                Add book
                            </a>
                        </div>
                    </div>
                    <div className="row mt-4 mb-4">
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
                                <div className="col-6 col-lg-2 mb-4">
                                        <p className="text-uppercase mb-2 text-secondary">
                                        <small>
                                            <b>Book's Author</b>
                                        </small>
                                        </p>
                                        <h6 className="mb-2">Book Title</h6>
                                        <p className="mb-1">
                                        <small>Genre</small>
                                        </p>
                                        <p>Price: <span>8$</span></p>
                                </div>
                                <div className="col-6 col-lg-4 mb-4 d-grid">
                                        <p className="text-uppercase mb-0 text-secondary">
                                            Book Condition
                                        </p>
                                        <p className="text-uppercase mb-0 text-secondary">
                                            Book Description
                                        </p>
                                        <a href="#" className="btn btn-edit d-flex mt-3">
                                            Edit book
                                        </a>
                                </div>
                                <div className="col-6 col-lg-4 mb-4 for-sale-container">
                                        <p className="for-sale rounded">
                                            For Sale
                                        </p>
                                </div>
                            </div>
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