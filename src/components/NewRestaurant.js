import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
     * cuisine
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

    const navigate = useNavigate();
    
    //update form state as user inputs information
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
                };
            });
    };

    //on form submit check all fields for valid inputs
    const findErrors = () => {
        //destructure form input for validation
        const {
            name,
            cuisine,
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
        if (!name || name === "") {
            newErrors.name = "Cannot be blank!";
        } else if (name.length > 50) {
            newErrors.name = "Name is too long!";
        }

        //cuisine errors
        if (!cuisine || cuisine === "") {
            newErrors.cuisine = "Cannot be blank!";
        } else if (name.length > 50) {
            newErrors.cuisine = "Cuisine type is too long!";
        }

        //description errors
        if (!description || description === "") {
            newErrors.description = "Cannot be blank!";
        } else if (description.length > 1500) {
            newErrors.description =
                "Character limit exceded! 1500 chararacters max";
        }

        //price errors
        if (!price) {
            newErrors.price = "Must choose a price";
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

        //phone number errors
        if (!phoneNumber || phoneNumber === "") {
            newErrors.phoneNumber = "Cannot be blank!";
        } else {
            //pull all digits out of user's input and check if there's 10 digits
            let nums = [];
            for (let c of phoneNumber) {
                if (/[0-9]/.test(c)) {
                    nums.push(c);
                }
            }
            if (nums.length !== 10) {
                newErrors.phoneNumber = "Must be a 10-digit phone number!"
            } else {
                //if phone number is legit set form state to valid phone number format for post
                setForm((prev) => {
                    return {
                        ...prev,
                        phoneNumber: nums.join('')
                    }
                })
            }
        }

        // table error checking
        if (twoPerson && twoPerson < 0) {
            newErrors.twoPerson = "Invalid # of tables";
        }
        if (fourPerson && fourPerson < 0) {
            newErrors.fourPerson = "Invalid # of tables";
        }
        if (eightPerson && eightPerson < 0) {
            newErrors.eightPerson = "Invalid # of tables";
        }

        return newErrors;
    };

    /** handles form submit **/
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        let body;

        //check submission for errors
        const newErrors = findErrors();

        //if there are errors set error state
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            //destructure form input
            const {
                name,
                cuisine,
                description,
                price,
                location,
                openingTime,
                closingTime,
                phoneNumber,
                diningRestriction,
                twoPerson,
                fourPerson,
                eightPerson,
            } = form;

            //generate a temp object for tables if any were inputted
            let tempTables;
            if (twoPerson || fourPerson || eightPerson) {
                tempTables = {
                    ...(twoPerson
                        ? { twoPersonTables: Number(twoPerson) }
                        : { twoPersonTables: 0 }),
                    ...(fourPerson
                        ? { fourPersonTables: Number(fourPerson) }
                        : { fourPersonTables: 0 }),
                    ...(eightPerson
                        ? { eightPersonTables: Number(eightPerson) }
                        : { eightPersonTables: 0 }),
                };
            } else {
                tempTables = null;
            }

            //stringify valid user inputs into body for post
            body = JSON.stringify({
                name,
                cuisine,
                description,
                price,
                location,
                openingTime: openingTime + ":00",
                closingTime: closingTime + ":00",
                ...(phoneNumber ? { phoneNumber } : { phoneNumber: null }),
                ...(diningRestriction && { diningRestriction }),
                tables: tempTables,
            });
            const config = {
                method: "post",
                url: `${API}/restaurants`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: body,
            };
    
            //post new restaurant and navigate back to restaurants page
            axios(config)
                .then(response => {
                    console.log(JSON.stringify(response.data));
                    navigate("/restaurants");
                })
                .catch(error => {
                    console.log(error);
                });
        }

    };

    return (
        <Container fluid className="formContainer mb-4">
            <Form>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Name</Form.Label>
                    <FormControl
                        type="text"
                        value={form.name}
                        placeholder="Enter Restaurant Name"
                        onChange={(e) => setField("name", e.target.value)}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Cuisine</Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Enter Cuisine Type"
                        onChange={(e) => setField("cuisine", e.target.value)}
                        isInvalid={!!errors.cuisine}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.cuisine}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
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
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="Phone Number"
                        onChange={(e) =>
                            setField("phoneNumber", e.target.value)
                        }
                        isInvalid={!!errors.phoneNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phoneNumber}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Dining Restrictions (optional)</Form.Label>
                    <Form.Select
                        onChange={(e) =>
                            setField("diningRestriction", e.target.value)
                        }
                    >
                        <option disabled selected></option>
                        <option value="Takeout Only">Takeout Only</option>
                        <option value="Delivery Only">Delivery Only</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Tables (optional)</Form.Label>
                    <Row>
                        <Col>
                            <Form.Label>2-Person</Form.Label>
                            <FormControl
                                type="number"
                                onChange={(e) =>
                                    setField("twoPerson", e.target.value)
                                }
                                isInvalid={!!errors.twoPerson}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.twoPerson}
                            </Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Label>4-Person</Form.Label>
                            <FormControl
                                type="number"
                                min="0"
                                onChange={(e) =>
                                    setField("fourPerson", e.target.value)
                                }
                                isInvalid={!!errors.fourPerson}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.fourPerson}
                            </Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Label>8-Person</Form.Label>
                            <FormControl
                                type="number"
                                min="0"
                                onChange={(e) =>
                                    setField("eightPerson", e.target.value)
                                }
                                isInvalid={!!errors.eightPerson}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.eightPerson}
                            </Form.Control.Feedback>
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
