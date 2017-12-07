import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function BookCover (props)  {
  const { book, shelf, onUpdateShelf } = props

  return (
    <div>
      <Link to={`/book/${book.id}`}>
        <div className="book-cover" style={ book.imageLinks.thumbnail && { backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
  )
}

BookCover.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
  shelf: PropTypes.string,
}

export default BookCover
