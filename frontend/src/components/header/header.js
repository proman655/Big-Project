import React from "react";
import {NavLink, Link} from 'react-router-dom'
import Logo from '../../pictures/logo-nobg.png'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css'


const Header = () => {
    return(
        <Navbar bg="light" expand="lg" className="navbar">
            <Container fluid>
                <Navbar.Brand href="/home">
                    <img src={Logo} alt='logo' className='header-logo-img'/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home" className="navbar-item">Projects</Nav.Link>
                        <Nav.Link href="#action2" className="navbar-item">Tasks</Nav.Link>
                        <Nav.Link href="/profile" className="navbar-item">Profile</Nav.Link>
                        <NavDropdown title="Settings"  id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3" className="navbar-item">Language</NavDropdown.Item>
                            <NavDropdown.Item href="/" className="navbar-item">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header;