import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Labassure Report Generator</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="">About</Nav.Link>
          <NavDropdown title="Form" id="basic-nav-dropdown">
            <NavDropdown.Item href="/dual-marker">Dual Marker</NavDropdown.Item>
            <NavDropdown.Item href="/triple-marker">Triple Marker</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/quad-marker">Quad Marker</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;