import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import '../styles/nav.css';


export const Navigation = () => {
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="light" expand="lg" fixed="top" id="navBar">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link onClick={() => navigate("/restaurants")}>
                            Restaurants
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate("/reservations")}>
                            Reservations
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate("/newRestaurant")}>
                            New Restaurant
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
