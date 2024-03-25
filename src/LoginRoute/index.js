import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({isPasswordShown: !prevState.isPasswordShown}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      isPasswordShown,
      showSubmitError,
      errorMsg,
    } = this.state

    const showPassword = isPasswordShown ? 'text' : 'password'

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="LoginContainer">
        <form className="LoginForm" onSubmit={this.onLogin}>
          <div className="UsernameAndPasswordContainer">
            <label className="LabelText" htmlFor="username">
              USERNAME
            </label>
            <input
              className="InputContainer"
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label className="LabelText" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="InputContainer"
              type={showPassword}
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button className="LoginButton" type="submit">
              Login
            </button>
            {showSubmitError && <p className="ShowErrorMsg">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginRoute
