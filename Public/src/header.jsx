import React from 'react'
import Container from 'react-bootstrap/Container';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../public/logo.png'

export const Header = () => {
    const navigate = useNavigate();

    const Logout = () => {
        // Remove user information from local storage
        localStorage.removeItem('publicuser');
        navigate('/');
    };

    const user_id = localStorage.getItem('publicuser');
    const object = user_id ? JSON.parse(user_id) : null;

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#">
                    <img src={Logo} alt="" className='img-fluid p-0' width={'220px'} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    {object ? (
                        <Nav className="ms-auto">
                            {/* <Nav.Link href="#link">Link</Nav.Link> */}
                            <NavDropdown className='text-hover-dark' title={object.username} id="basic-nav-dropdown">
                                <NavLink className={"dropdown-item"} title={object.username} to="/signin">Dashboard</NavLink>
                                <hr className='my-0' />
                                <NavDropdown.Item className="btn btn-primary" onClick={Logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <NavLink to="/signin">Signin</NavLink>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
