import React from 'react'
import PropTypes from 'prop-types'
import BookCover from './BookCover'

function Book (props)  {
  const { book, shelf, onUpdateShelf } = props

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <BookCover book={ book } onUpdateShelf={ onUpdateShelf } shelf={ shelf } />
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
