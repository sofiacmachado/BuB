// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Book from './book';

document.addEventListener('DOMContentLoaded', () => {
    const node = document.getElementById('params');
    const data = JSON.parse(node.getAttribute('data-params'));

    ReactDOM.render(
      <Book book_id={data.book_id} />,
      document.body.appendChild(document.createElement('div')),
    )
  })
