import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

function Bookshelf (props)  {
  const { id, title, books, onUpdateShelf } = props

  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books && books.map((book) => (
              <Book bookShelf={ id } shelf={ book.shelf } book={ book } key={ book.id } onUpdateShelf={ onUpdateShelf } />
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  books: PropTypes.array,
  id: PropTypes.string.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default Bookshelf
