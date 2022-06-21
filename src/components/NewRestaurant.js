import React, { useState } from "react";
import axios from "axios";

import {
    Form,
    FormControl,
    Button,
    Container,
    Row,
    Col,
} from "react-bootstrap";

import "../styles/newRestaurant.css";

const API = process.env.REACT_APP_API_URL;

/**
 * component to add a new restaurant
 * @returns a form to add a new restaurant to DB
 */
export const NewRestaurant = () => {
    /**
     * state for current form input ->
     * {
     * name:
     * description:
     * price:
     * location:
     * openingTime
     * closingTime
     * phoneNumber
     * diningRestrictons
     * twoPerson
     * fourPerson
     * eightPerson
     * }
     */
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const setField = (field, value) => {
        setForm((prev) => {
            return {
                ...prev,
                [field]: value,
            };
        });

        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field])
            setErrors((prev) => {
                return {
                    ...prev,
                    [field]: null,
                }
            });
    };

    const findErrors = () => {
        const {
            name,
            description,
            price,
            location,
            openingTime,
            closingTime,
            phoneNumber,
            diningRestrictions,
            twoPerson,
            fourPerson,
            eightPerson,
        } = form;

        const newErrors = {};

        //name errors
        if (!name || name==='') {
            newErrors.name = 'Cannot be blank!';
        } else if (name.length > 50) {
            newErrors.name = 'Name is too long!';
        }

        //description errors
        if (!description || description === '') {
            newErrors.description = 'Cannot be blank!';
        } else if (description.length > 1500) {
            newErrors.description = "Character limit exceded! 1500 chararacters max";
        }

        //price errors 
        if (!price) {
            newErrors.price = 'Must choose a price';
        }

        //location errors
         if (!location || location === "") {
             newErrors.location = "Cannot be blank!";
         } else if (location.length > 75) {
             newErrors.location = "Location is too long!";
         }

         // open / close time errors
         if (!openingTime) {
             newErrors.openingTime = "Cannot be blank!";
         }
         if (!closingTime) {
             newErrors.closingTime = "Cannot be blank!";
         }



         return newErrors;
    };

    /** handles form submit **/
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        //check submission for errors
        const newErrors = findErrors();

        //if there are errors set error state
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            alert('ITs LEGIT');
        }

        // const body = JSON.stringify({
        //     name: e.target.name.value,
        //     description: e.target.description.value,
        //     phoneNumber: e.target.phoneNumber.value,
        //     openingTime: e.target.openingTime.value,
        //     closingTime: e.target.closingTime.value,
        //     price: e.target.price.value,
        //     cuisine: e.target.cuisine.value,
        //     location: e.target.location.value,
        //     diningRestriction: e.target.diningRestriction.value,
        // });

        // const config = {
        //     method: "post",
        //     url: `${API}/restaurants`,
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     data: body,
        // };

        // axios(config)
        //     .then(function (response) {
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    };

    return (
        <Container fluid className="formContainer mb-4">
            <Form>
                <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
                    <Form.Label>Name</Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Enter Restaurant Name"
                        onChange={(e) => setField("name", e.target.value)}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Description</Form.Label>
                    <FormControl
                        as="textarea"
                        rows="4"
                        placeholder="Restaurant Description"
                        onChange={(e) =>
                            setField("description", e.target.value)
                        }
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Select
                        isInvalid={!!errors.price}
                        onChange={(e) => setField("price", e.target.value)}
                    >
                        <option disabled selected></option>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                        <option value="$$$$">$$$$</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.price}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Location"
                        onChange={(e) => setField("location", e.target.value)}
                        isInvalid={!!errors.location}
                    ></FormControl>
                    <Form.Control.Feedback type="invalid">
                        {errors.location}
                    </Form.Control.Feedback>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Opening Time</Form.Label>
                            <FormControl
                                type="time"
                                onChange={(e) =>
                                    setField("openingTime", e.target.value)
                                }
                                isInvalid={!!errors.openingTime}
                            ></FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors.openingTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Closing Time</Form.Label>
                            <FormControl
                                type="time"
                                onChange={(e) =>
                                    setField("closingTime", e.target.value)
                                }
                                isInvalid={!!errors.closingTime}
                            ></FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors.closingTime}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <FormControl
                    // as="input"
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="Phone Number (optional)"
                        onChange={(e) =>
                            setField("phoneNumber", e.target.value)
                        }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Dining Restrictions (optional)</Form.Label>
                    <Form.Select
                        onChange={(e) =>
                            setField("diningRestrictions", e.target.value)
                        }
                    >
                        <option disabled selected></option>
                        <option value="Takeout Only">Takeout Only</option>
                        <option value="Delivery Only">Delivery Only</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tables</Form.Label>
                    <Row>
                        <Col>
                            <Form.Label>2-Person</Form.Label>
                            <FormControl
                                type="number"
                                onChange={(e) =>
                                    setField("twoPerson", e.target.value)
                                }
                            />
                        </Col>
                        <Col>
                            <Form.Label>4-Person</Form.Label>
                            <FormControl
                                type="number"
                                min="0"
                                onChange={(e) =>
                                    setField("fourPerson", e.target.value)
                                }
                            />
                        </Col>
                        <Col>
                            <Form.Label>8-Person</Form.Label>
                            <FormControl
                                type="number"
                                min="0"
                                onChange={(e) =>
                                    setField("eightPerson", e.target.value)
                                }
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mt-3 text-center">
                    <Button
                        variant="outline-success w-100"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
};
