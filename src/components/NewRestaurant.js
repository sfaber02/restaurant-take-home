import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const {
    phoneNumberFormatter,
    phoneNumberValidator,
} = require("../helper-functions/helpers.js");

const API = process.env.REACT_APP_API_URL;

/**
 * component to add or edit a restaurant
 * @returns a form to add/edit a restaurant
 */
export const NewRestaurant = ({ restaurants }) => {
    //id from route if we landed here from the edit restaurant button
    const { id } = useParams();

    //initialize form state to empty values
    const [form, setForm] = useState(() => {
        return ({
            name: "",
            cuisine: "",
            description: "",
            price: "",
            location: "",
            openingTime: "",
            closingTime: "",
            phoneNumber: "",
            diningRestriction: "DEFAULT",
            twoPerson: "",
            fourPerson: "",
            eightPerson: "",
        })
    });

    //state to hold errors from from bad user inputs
    const [errors, setErrors] = useState({});
    
    //state for edit / new restaurant mode
    const [editMode, setEditMode] = useState(false);
    
    // ref to hold original restaurant info for editing
    const originalRestaurantData = useRef();

    const navigate = useNavigate();

    /**
     * if there there is an id from landing on this page via the edit restaurant button
     * prefill form with current restaurant info for editing
     *
     **/
    useEffect(() => {
        if (id) {
            //set edit mode will change button text and post / patch verb  on submit
            setEditMode(true);

            //find current restaurant in all restaurants object and store as ref
            originalRestaurantData.current = restaurants.filter(
                (e) => e.id === id
            )[0];

            //destructure current restaurant data to be displayed in form
            const {
                name,
                description,
                phoneNumber,
                openingTime,
                closingTime,
                location,
                cuisine,
                price,
                diningRestriction,
                tables,
            } = originalRestaurantData.current;

            //set form to current restaurant data
            setForm({
                name,
                cuisine,
                description,
                price,
                location,
                openingTime,
                closingTime,
                phoneNumber,
                diningRestriction,
                ...(tables && { twoPerson: tables.twoPersonTables }),
                ...(tables && { fourPerson: tables.fourPersonTables }),
                ...(tables && { eightPerson: tables.eightPersonTables }),
            });
        }
    }, [id]);

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
            let phone = phoneNumberValidator(phoneNumber);
            if (!phone) {
                newErrors.phoneNumber = "Must be a 10-digit phone number!";
            } else {
                //if phone number is legit set form state to valid phone number format for post
                setForm((prev) => {
                    return {
                        ...prev,
                        phoneNumber: phone.join(""),
                    };
                });
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

        //check submission for errors
        const newErrors = findErrors();

        //if there are errors set error state
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            //if form passed validation destructure form input
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

            //if we are posting a new restaurant
            if (!editMode) {
                //stringify valid user inputs into body for post
                const body = JSON.stringify({
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
                    .then((response) => {
                        console.log(JSON.stringify(response.data));
                        navigate("/restaurants");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                //compare current inputs to original inputs for changes
                const patchOb = objectComparer(
                    form,
                    originalRestaurantData.current,
                    tempTables
                );

                console.log(patchOb);

                const data = JSON.stringify(patchOb);

                var config = {
                    method: "patch",
                    url: `${API}/restaurants/${id}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: data,
                };

                axios(config)
                    .then((response) => {
                        console.log(JSON.stringify(response.data));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };

    return (
        <Container fluid className="formContainer mb-4">
            <Form>
                {/* RESTAURANT NAME INPUT  */}
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

                {/* CUISINE INPUT  */}
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Cuisine</Form.Label>
                    <FormControl
                        type="text"
                        value={form.cuisine}
                        placeholder="Enter Cuisine Type"
                        onChange={(e) => setField("cuisine", e.target.value)}
                        isInvalid={!!errors.cuisine}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.cuisine}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* DESCRIPTION INPUT  */}
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <FormControl
                        as="textarea"
                        rows="4"
                        placeholder="Restaurant Description"
                        value={form.description}
                        onChange={(e) =>
                            setField("description", e.target.value)
                        }
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* PRICE INPUT  */}
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Select
                        isInvalid={!!errors.price}
                        value={form.price}
                        onChange={(e) => setField("price", e.target.value)}
                        defaultValue={"DEFAULT"}
                    >
                        <option disabled value="DEFAULT"></option>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                        <option value="$$$$">$$$$</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.price}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* LOCATION INPUT  */}
                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <FormControl
                        type="text"
                        value={form.location}
                        placeholder="Location"
                        onChange={(e) => setField("location", e.target.value)}
                        isInvalid={!!errors.location}
                    ></FormControl>
                    <Form.Control.Feedback type="invalid">
                        {errors.location}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* OPEN / CLOSE TIMES INPUT  */}
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Opening Time</Form.Label>
                            <FormControl
                                type="time"
                                value={form.openingTime}
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
                                value={form.closingTime}
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

                {/* PHONE NUMBER INPUT  */}
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <FormControl
                        value={form.phoneNumber}
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

                {/* DINING RESTRICTION INPUT  */}
                <Form.Group>
                    <Form.Label>Dining Restrictions (optional)</Form.Label>
                    <Form.Select
                        value={form.diningRestriction}
                        defaultValue={"DEFAULT"}
                        onChange={(e) =>
                            setField("diningRestriction", e.target.value)
                        }
                    >
                        <option disabled value="DEFAULT"></option>
                        <option value="Takeout Only">Takeout Only</option>
                        <option value="Delivery Only">Delivery Only</option>
                    </Form.Select>
                </Form.Group>

                {/* TABLES INPUT  */}
                <Form.Group className="mt-2">
                    <Form.Label>Tables (optional)</Form.Label>
                    <Row>
                        <Col>
                            <Form.Label>2-Person</Form.Label>
                            <FormControl
                                value={form.twoPerson}
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
                                value={form.fourPerson}
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
                                value={form.eightPerson}
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

                {/* SUBMIT  */}
                <Form.Group className="mt-3 text-center">
                    <Button
                        variant="outline-success w-100"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        {editMode ? "Submit Edit" : "Submit"}
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
};





/**
 * compares the current inputs to the original state and outputs
 * an object with just the changes for patching
 *
 * @param {object} inputs new state of inputs
 * @param {object} original state of inputs
 * @param {object} tables object of current table inputs
 */
const objectComparer = (inputs, original, tables) => {

    //if we are editing a restaurant check to see which fields to patch
    let patchOb = {};

    //compare form state to originalRestaurantDate ref
    //if form state is different add to patch ob
    for (let key in inputs) {

        //skip the tables twoPerson, fourPerson, eightPerson Objects but check all other objects
        if (!(key.slice(key.length - 3) === "son")) {
            if (inputs[key] !== original[key]) {
                patchOb[key] = inputs[key];
            }
        }
    }
    console.log(patchOb);

    //check if any table counts have been inputted
    if (tables) {
        //loop through tables object to find differences
        for (let key in tables) {
            if (
                tables[key] !== original.tables[key]
            ) {
                console.log(patchOb);
                if (!patchOb["tables"]) {
                    patchOb["tables"] = {};
                    patchOb.tables[key] = tables[key];
                } else {
                    patchOb["tables"][key] = tables[key];
                }
            }
        }
    }

    return patchOb
};
