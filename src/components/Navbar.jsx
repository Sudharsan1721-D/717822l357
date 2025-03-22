import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  const location = useLocation();
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Social Media Analytics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              active={location.pathname === '/'}
              className="nav-link"
            >
              Top Users
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/trending" 
              active={location.pathname === '/trending'}
              className="nav-link"
            >
              Trending Posts
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/feed" 
              active={location.pathname === '/feed'}
              className="nav-link"
            >
              Feed
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;