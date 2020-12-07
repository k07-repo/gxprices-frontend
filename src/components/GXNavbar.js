import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Modal, Nav, Navbar } from 'react-bootstrap'

import Auth from '../utils/auth'
import listService from '../services/listService'
import loginService from '../services/loginService'
import { LOCAL_STORAGE_ID } from '../utils/constants'

const GXNavbar = () => {
  //eslint-disable-next-line
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  let history = useHistory()

  const handleLogout = async (event) => {
    event.preventDefault()
    Auth.logout()
    setUser(null)
    history.push('/')
    window.location.reload()
    
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        LOCAL_STORAGE_ID, JSON.stringify(user)
      )

      listService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      history.push('/')
      window.location.reload()
    } catch (exception) {
      setShow(true)
    }
  }

  let loggedInUser = Auth.getLoggedInUser()

  const loginFailedModal = () => {
    const handleClose = () => setShow(false)

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Invalid credentials!
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        {loginFailedModal()}
        <input id="username" type="text" value={username} placeholder="Username" name="Username" onChange={({ target }) => setUsername(target.value)} />
          &nbsp;
        <input id="password" type="password" value={password} placeholder="Password" name="Password" onChange={({ target }) => setPassword(target.value)} />
          &nbsp;
        <button type="submit">Log In</button>
      </form>
    )
  }


  const logoutForm = () => {
    let loginString = ''
    if (loggedInUser) {
      loginString = 'Logged in as ' + loggedInUser.username + ' '
    }

    return (
      <form onSubmit={handleLogout}>
        {loginString}
        <button type="submit">Logout</button>
      </form>
    )
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">GXPrices</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Prices</Nav.Link>
          <Nav.Link as={Link} to="/watchlist">Watchlist</Nav.Link>
          <Nav.Link as={Link} to="/collection">Collection</Nav.Link>
          {loggedInUser ? null : <Nav.Link as={Link} to="/register">Register</Nav.Link>}
          {loggedInUser ? <Nav.Link as={Link} to="/userpage">Account</Nav.Link> : null}
          <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
        </Nav>
        <Nav>
          {loggedInUser ? logoutForm() : loginForm()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )

}

export default GXNavbar