import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Link from 'next/link'

const NavbarComp = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Neladisify</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav className="nav-link"><Link className="nav-link" href="/" passHref>Home</Link></Nav>
              <Nav className="nav-link"><Link href="/about-us" passHref>About Us</Link></Nav>
              <Nav className="nav-link"><Link href="/contact-us" passHref>Contact Us</Link></Nav>
              <Nav className="nav-link"><Link href="/login" passHref>Login</Link></Nav>
              <Nav className="nav-link"><Link href="/registration" passHref>Registration</Link></Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavbarComp
