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
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">
                    <img src={Logo} alt='logo' className='header-logo-img'/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#action1">Projects</Nav.Link>
                        <Nav.Link href="#action2">Tasks</Nav.Link>
                        <Nav.Link href="#action3">Profile</Nav.Link>
                        <NavDropdown title="Settings" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Language</NavDropdown.Item>
                            <NavDropdown.Item><Link to="/">Logout</Link></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header;