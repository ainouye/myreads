import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Book (props)  {
  const { book, shelf, onUpdateShelf } = props

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <Link to={`/book/${book.id}`}>
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          </Link>
          <div className="book-shelf-changer">
            <select value={ shelf } onChange={ (event) => onUpdateShelf(event.target.value, book) }>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ book.title }</div>
        <div className="book-authors">{ book.authors && book.authors.join(', ') }</div>
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
  shelf: PropTypes.string
}

export default Book
