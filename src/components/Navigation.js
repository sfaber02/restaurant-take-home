import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";

import '../styles/nav.css';


export const Navigation = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.form[0].value);
    }

    return (
        <Navbar
            bg="dark"
            variant="light"
            expand="lg"
            sticky="top"
            className="border"
        >
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto my-2 my-lg-0">
                        <Nav.Link
                            onClick={() => navigate("/restaurants")}
                            className="text-light"
                        >
                            Restaurants
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => navigate("/reservations")}
                            className="text-light"
                        >
                            Reservations
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => navigate("/newRestaurant")}
                            className="text-light"
                        >
                            New Restaurant
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <FormControl
                            type="search"
                            placeholder="Search Restaurants"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success" onClick={handleClick}>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
