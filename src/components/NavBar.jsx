import React from 'react'
import {Navbar, Nav} from "react-bootstrap";
const NavBar = () => (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">COVID-19 Data Visualization</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/countries-list">Counties List</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default NavBar;