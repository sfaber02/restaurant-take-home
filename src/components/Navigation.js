import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";

import '../styles/nav.css';

/**
 * navbar used to navigate to various parts of the webpage
 * also contains search bar to search for restaurant
 * @returns navBar
 */
export const Navigation = ({handleSearch}) => {
    const navigate = useNavigate();

    /** handles submit event on search form */
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e.target[0].value);
        handleSearch(e.target[0].value);
        e.target[0].value = '';
    }

    /** handles click event on search button */
    const handleClick = (e) => {
        e.preventDefault();
        // console.log(e.target.form[0].value);
        handleSearch(e.target.form[0].value);
        e.target.form[0].value = '';
    }

    return (
        <Navbar
            bg="light"
            variant="light"
            expand="lg"
            sticky="top"
            className="border"
        >
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto my-2 my-lg-0">
                        <Nav.Link
                            onClick={() => navigate("/")}
                            className="text-dark"
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                handleSearch('');
                                navigate("/restaurants")
                            }}
                            className="text-dark"
                        >
                            Restaurants
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => navigate("/reservations")}
                            className="text-dark"
                        >
                            Reservations
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => navigate("/newRestaurant")}
                            className="text-dark"
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
