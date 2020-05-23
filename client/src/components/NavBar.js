import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
    <Navbar.Brand href="#">Eventonica</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#user-management-header">User Management</Nav.Link>
        <Nav.Link href="#event-management-header">Event Management</Nav.Link>
        <Nav.Link href="#event-search">Event Search</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}