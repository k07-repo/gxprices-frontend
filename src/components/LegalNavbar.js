import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const LegalNavbar = () => {
    return (
        <Navbar sticky="bottom" bg="light" expand="lg">
          <Navbar.Text>
             © 2020 GXPrices. Pokémon is © Nintendo 1996-2020.
          </Navbar.Text>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="mr-auto align-right">
            
          </Nav>     
          <Nav>
             <Nav.Link as={Link} to="/privacy">Privacy Policy</Nav.Link>
          </Nav>

        </Navbar>
    )
    
}

export default LegalNavbar