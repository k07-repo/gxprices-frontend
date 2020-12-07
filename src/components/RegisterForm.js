import React, { useEffect, useState } from 'react'
import listService from '../services/listService'
import userService from '../services/userService'
import { LOCAL_STORAGE_ID } from '../utils/constants'
//import { Button, Col, Form, InputGroup } from 'react-bootstrap'

const RegisterForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [validationMessage, setValidationMessage] = useState("")
  const [registered, setRegistered] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_ID)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      listService.setToken(user.token)
    }
  }, [])


  const handleRegistration = async (event) => {
    event.preventDefault()

    if (!username || username.length === 0) {
      setValidationMessage("Username required!")
      return
    }
    if (!password || password.length === 0) {
      setValidationMessage("Password required!")
      return
    }
    if (!(password === confirmPassword)) {
      setValidationMessage("Password and confirm password are different!")
      return
    }

    try {
      await userService.registerUser(username, password)
      setRegistered(true)
      //Tell user to log in
    } catch (exception) {
      //Force unique usernames
      //Could be improved I'm sure
      setValidationMessage("Username already in use!")
    }
  }

  const loginForm = () => {
    return (
      <div align="center" className="w-100 p-3">
        <h2>New user? Register here:</h2>
        
          <form class="form" onSubmit={handleRegistration}>
          <table>
            <tr>
              <td>
                Username
              </td>
              <td>
                <input class="form" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                Password
              </td>
              <td>
                <input class="form" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                Confirm Password
              </td>
              <td>
                <input class="form" type="password" value={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} />
              </td>
            </tr>
            <tr>
              <td align="center" colSpan="2">
                {validationMessage}
              </td>
            </tr>
            <tr>
              <td align="center" colSpan="2">
                <button type="submit">Register</button>
              </td>
            </tr>
          </table>
          </form>
        
      </div>
    )
  }

  const loginSuccessful = () => {
    return (
      <div className="w-100 p-3">
        Success! Log in with your new credentials.
      </div>
    )
  }

  return (
    <div>
      {registered ? loginSuccessful() : loginForm()}
    </div>
  )
}

export default RegisterForm