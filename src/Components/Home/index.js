// import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Home = props => {
  const logoutClicked = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <div>
      <h1>Home Page</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
      />

      <button type="button" onClick={logoutClicked}>
        Logout
      </button>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
      />
      <h1>Your Flexibility, Our Excellence</h1>
    </div>
  )
}

export default Home
