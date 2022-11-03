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
                    ? (<h5>{industryIdentifiers[0].type}: {industryIdentifiers[0].identifier}</h5>)
                    : ''; 
                const image_url = book.volumeInfo.hasOwnProperty('imageLinks') == false ? "https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg/revision/latest?cb=20141028171337" : book.volumeInfo.imageLinks.thumbnail;
                const summary = (description != null && description.length > 500)
                    ? description.substring(0, 500) + '...'
                    : description || '';

                return (
                    <a className="card-container" key={`g_result_${i}`} onClick={(e) => {onSelect(e, i)}}>
                        <img src={image_url} alt=""/>
                        <div className="desc">
                            <h4>{title}</h4>
                            <h4>Author: {authors}</h4>
                            <h5>{categories}</h5>
                            {book_number}
                            <h5>Summary:</h5>
                            <p>{summary}</p>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}

export default GoogleSearchPop;