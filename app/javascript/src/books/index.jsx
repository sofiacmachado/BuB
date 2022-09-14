// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Book from './book';

document.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(
    <Book />,
    document.body.appendChild(document.createElement('div')),
  )
})