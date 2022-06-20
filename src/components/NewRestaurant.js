import React from "react";
import axios from "axios";

import { Form, FormControl, Container, Row, Col } from "react-bootstrap";

const API = process.env.REACT_APP_API_URL;

/**
 * component to add a new restaurant
 * @returns a form to add a new restaurant to DB
 */
export const NewRestaurant = () => {

    /** handles form submit */
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.name.value);
        const body = JSON.stringify({
            name: e.target.name.value,
            description: e.target.description.value,
            phoneNumber: e.target.phoneNumber.value,
            openingTime: e.target.openingTime.value,
            closingTime: e.target.closingTime.value,
            price: e.target.price.value,
            cuisine: e.target.cuisine.value,
            location: e.target.location.value,
            diningRestriction: e.target.diningRestriction.value,
        });

        const config = {
            method: "post",
            url: `${API}/restaurants`,
            headers: {
                "Content-Type": "application/json",
            },
            data: body,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <Container className="w-25 p-3">
            <Form>
                <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Restaurant Name"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="4"
                        placeholder="Restaurant Description"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Select>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                        <option value="$$$$">$$$$</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Location"
                        required
                    ></Form.Control>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Opening Time</Form.Label>
                            <Form.Control type="time"></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Closing Time</Form.Label>
                            <Form.Control type="time"></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Phone Number (optional)"
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Dining Restrictions (optional)</Form.Label>
                    <Form.Select>
                        <option></option>
                        <option value="Takeout Only">Takeout Only</option>
                        <option value="Delivery Only">Delivery Only</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tables</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control type="number"></Form.Control>

                        </Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </Form.Group>
            </Form>
        </Container>
    );
};


/*

 <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input name="name" type="text" />
            <label htmlFor="description">Description: </label>
            <input name="description" type="text" />
            <label htmlFor="phoneNumber">Phone Number: </label>
            <input name="phoneNumber" type="text" />
            <label htmlFor="openingTime">Opening Time: </label>
            <input name="openingTime" type="text" />
            <label htmlFor="closingTime">Closing Time: </label>
            <input name="closingTime" type="text" />
            <label htmlFor="price">Price: </label>
            <input name="price" type="text" />
            <label htmlFor="cuisine">Cuisine: </label>
            <input name="cuisine" type="text" />
            <label htmlFor="location">Location: </label>
            <input name="location" type="text" />
            <label htmlFor="diningRestriction">Dining Restriction: </label>
            <input name="diningRestriction" type="text" />
            <input type="submit" />
        </form>

        */