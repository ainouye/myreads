import React from 'react'
import './App.css'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookDetail from './BookDetail'
import BookSearch from './BookSearch'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentWillMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    }).catch(e => {})
  }

  onUpdateShelf = (shelf, book) => {
    book.shelf = shelf

    BooksAPI.update(book, shelf).then(() => {
      this.setState((state) => ({
        books: state.books.filter((c) => c.id !== book.id).concat([ state, book ])
      }))
    }).catch(e => { })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <Bookshelf id='currentlyReading' title="Currently Reading" books={ this.state.books.filter((c) => c.shelf === 'currentlyReading') } onUpdateShelf={ this.onUpdateShelf }/>
                <Bookshelf id='wantToRead' title="Want To Read" books={ this.state.books.filter((c) => c.shelf === 'wantToRead') } onUpdateShelf={ this.onUpdateShelf }/>
                <Bookshelf id='read' title="Read" books={ this.state.books.filter((c) => c.shelf === 'read') } onUpdateShelf={ this.onUpdateShelf }/>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={() => (
          <BookSearch onUpdateShelf={ this.onUpdateShelf } shelvedBooks={ this.state.books } />
        )} />
        <Route path="/book/:bookId" render={(routeProps) => (
          <BookDetail {...routeProps} onUpdateShelf={ this.onUpdateShelf } />
        )} />
      </div>
    )
  }
}

export default BooksApp
