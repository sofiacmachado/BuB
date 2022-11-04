import React from 'react';


const GoogleSearchPop = (props) => {

    if (props.books.length == 0) {
        return(
        <div>
        </div>)
    }

    const onSelect = props.onSelect != null ? props.onSelect : (() => {});

    return (
        <div>
            { props.books.map((book, i) => {
                const {title, authors, averageRating, categories, description, industryIdentifiers} = book.volumeInfo;
                const book_number = (industryIdentifiers != null && industryIdentifiers.length > 0)
                    ? (<p className="mb-0 small"><small>{industryIdentifiers[0].type}: {industryIdentifiers[0].identifier}</small></p>)
                    : ''; 
                const image_url = book.volumeInfo.hasOwnProperty('imageLinks') == false ? "https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg/revision/latest?cb=20141028171337" : book.volumeInfo.imageLinks.thumbnail;
                const summary = (description != null && description.length > 250)
                    ? description.substring(0, 250) + '...'
                    : description || '';

                return (
                    <div  className="col-3 mb-4 d-inline-flex justify-content-center searchResults">
                        <a className="text-body text-decoration-none" key={`g_result_${i}`} onClick={(e) => {onSelect(e, i)}}>
                            <div className="google-book-image mb-1 rounded" style={{ backgroundImage: `url(${image_url})` }} />
                            <div className="me-4 text-field">
                                <h6 className="title">"{title}"</h6>
                                <p className="text-uppercase mb-0 text-secondary medium"><b>{authors}</b></p>
                                <h6 className="mb-0 small">{categories}</h6>
                                {book_number}
                                <p className="mb-0 extra-small">{summary}</p>
                            </div>
                        </a>
                    </div>
                );
            })}
        </div>
    );
}

export default GoogleSearchPop;