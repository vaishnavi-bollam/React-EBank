import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmiterror: false,
    errorMsg: '',
    usernameerror: false,
  }

  onUsernameChange = event => this.setState({username: event.target.value})

  onPasswordChange = event => this.setState({password: event.target.value})

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    console.log(history)
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({
      showSubmiterror: true,
      errorMsg: error,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    if (username === '' || password === '') {
      this.setState({usernameerror: true})
    }

    const url = 'https://apis.ccbp.in/ebank/login'

    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => (
    <div>
      <label htmlFor="username">User ID</label>
      <input
        type="text"
        id="username"
        placeholder="UserName"
        onChange={this.onUsernameChange}
      />
    </div>
  )

  renderPassword = () => (
    <div>
      <label htmlFor="password">PIN</label>
      <input
        type="password"
        id="password"
        placeholder="PASSWORD"
        onChange={this.onPasswordChange}
      />
    </div>
  )

  render() {
    const {showSubmiterror, usernameerror, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    console.log('vaishu')
    return (
      <div>
        <form onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
            alt="website login"
          />
          <h1>Welcome Back</h1>
          <div>{this.renderUsername()}</div>
          <div>{this.renderPassword()}</div>
          <button type="submit">Login</button>
          {showSubmiterror && <p>{errorMsg}</p>}
          <p>{usernameerror ? 'Invalid Credentials' : ''}</p>
        </form>
      </div>
    )
  }
}

export default Login
