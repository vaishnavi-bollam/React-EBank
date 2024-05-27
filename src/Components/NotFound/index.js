import {Component} from 'react'

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>Page Not Found</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
          alt="not found"
        />
        <p>We are sorry, the page you requested could not be found</p>
      </div>
    )
  }
}

export default NotFound
