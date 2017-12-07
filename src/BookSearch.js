import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Debounce } from 'react-throttle';
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookSearch extends React.Component {
  state = {
    searchResult: [ ]
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim(), searchResult: [ ] })
    if ( query ) {
      BooksAPI.search(query, 20).then((searchResult) => {
        this.setState({ searchResult })
      }).catch(e => {})
    }
  }

  render() {
    const { shelvedBooks, onUpdateShelf } = this.props
    const { searchResult } = this.state

    shelvedBooks.forEach(function(shelvedBook) {
      searchResult.forEach(function(searchBook) {
        if (shelvedBook.id === searchBook.id) {
          searchBook.shelf = shelvedBook.shelf
        }
      })
    })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="300" handler="onChange">
              <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)} />
            </Debounce>
          </div>
        </div>
        { searchResult && (
          <div className="search-books-results">
            <ol className="books-grid">
              { searchResult.map((book) => (
                <Book book={ book } shelf={ book.shelf || "none" } key={ book.id } onUpdateShelf={ onUpdateShelf } />
              ))}
            </ol>
          </div>
        )}
      </div>
    )
  }
}

BookSearch.propTypes = {
  onUpdateShelf: PropTypes.func.isRequired,
  shelvedBooks: PropTypes.array
}

export default BookSearch
