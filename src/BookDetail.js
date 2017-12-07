import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookCover from './BookCover'

class BookDetail extends React.Component {
  state = {
    book: [ ]
  }

  componentWillMount() {
    const { match: { params } } = this.props
    BooksAPI.get(params.bookId).then((book) => {
      this.setState({ book })
    }).catch(e => {})
  }

  render() {
    const { onUpdateShelf } = this.props
    const { book } = this.state

    return (
      <div>
        <Link className="close-search" to="/">Close</Link>
        { book.imageLinks && (
          <div className="book-content">
            <h2 className="bookshelf-title">{ book.title }</h2>
            <div className="book-row">
              <div className="book-image">
                <BookCover book={ book } onUpdateShelf={ onUpdateShelf } shelf={ book.shelf } />
              </div>
              <div className="book-details">
                <p><strong>Authors: </strong> { book.authors && book.authors.join(', ') }</p>
                <p><strong>Published: </strong> { book.publishedDate }</p>
                <p><strong>Publisher: </strong> { book.publisher }</p>
                <p><strong>Pages: </strong> { book.pageCount }</p>
              </div>
            </div>
            <div>
              <p>{ book.description }</p>
            </div>
          </div>
        )}
      </div>
    )
  }
}

BookDetail.propTypes = {
  onUpdateShelf: PropTypes.func.isRequired,
}

export default BookDetail
