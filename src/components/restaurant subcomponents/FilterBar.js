import React, { useState } from "react";
import { Navbar, Form, Container, Button, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

/**
 * a navbar of select elements to filter restaurants view based on various fields
 * @param {object} filterHash state from <App /> determines what filters are available based on display list
 * @param {function} handleFilter function from <App /> sets current filter in <App /> triggering a new displaylist and filterHash
 * @param {function} handleReset function from <App /> to reset filters
 * @returns
 */
export const FilterBar = ({ filterHash, handleFilter, handleReset }) => {
    /**
     * filters -  stores all the current available filter options
     * filterState - stores all current filter selections
     */
    // const [filters, setFilters] = useState();
    const [filterState, setFilterState] = useState(() => {
        return {
            cuisine: "DEFAULT",
            location: "DEFAULT",
            price: "DEFAULT",
            restrictions: "DEFAULT",
        };
    });

    /**
     * handles changes made to filter select boxes,
     * calls handleFilter() from <Restaurants />
     * @param {object} event object
     */
    const handleChange = (e) => handleFilter(e.target.value, e.target.id);

    /**
     * updates filterState which stores the current values of the filters
     * mainly used to reset the filters to their defaults when reset is hit
     * @param {string} field (ex. location, cuisine)
     * @param {string} value (value of field)
     */
    const setField = (field, value) => {
        setFilterState((prev) => {
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    return (
        <>
            <Navbar bg="light" variant="light" expand="lg" className="">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Navbar.Brand className="mx-2">Filters</Navbar.Brand>
                    <Container className="border mt-2">
                        <Row xs={1} sm={1} md={1} lg={5}>
                            <Col className="my-1">
                                {/* LOCATION FILTERS  */}
                                {filterHash &&
                                    Object.keys(filterHash.location).length >
                                        0 && (
                                        <Form.Select
                                            onChange={(e) => {
                                                handleChange(e);
                                                setField(
                                                    "location",
                                                    e.target.value
                                                );
                                            }}
                                            value={filterState.location}
                                            id="location"
                                        >
                                            <option disabled value="DEFAULT">
                                                Location
                                            </option>
                                            {Object.keys(
                                                filterHash.location
                                            ).map((key) => (
                                                <option
                                                    value={key}
                                                    key={uuidv4()}
                                                >{`${key} (${filterHash.location[key]})`}</option>
                                            ))}
                                        </Form.Select>
                                    )}
                            </Col>
                            <Col className="my-1">
                                {/* CUISINE FILTERS  */}
                                {filterHash &&
                                    Object.keys(filterHash.cuisine).length >
                                        0 && (
                                        <Form.Select
                                            onChange={(e) => {
                                                handleChange(e);
                                                setField(
                                                    "cuisine",
                                                    e.target.value
                                                );
                                            }}
                                            value={filterState.cuisine}
                                            id="cuisine"
                                        >
                                            <option disabled value="DEFAULT">
                                                Cuisine
                                            </option>
                                            {Object.keys(
                                                filterHash.cuisine
                                            ).map((key) => (
                                                <option
                                                    value={key}
                                                    key={uuidv4()}
                                                >{`${key} (${filterHash.cuisine[key]})`}</option>
                                            ))}
                                        </Form.Select>
                                    )}
                            </Col>
                            <Col className="my-1">
                                {/* PRICE FILTERS  */}
                                {filterHash &&
                                    Object.keys(filterHash.price).length >
                                        0 && (
                                        <Form.Select
                                            onChange={(e) => {
                                                handleChange(e);
                                                setField(
                                                    "price",
                                                    e.target.value
                                                );
                                            }}
                                            value={filterState.price}
                                            id="price"
                                        >
                                            <option disabled value="DEFAULT">
                                                Price
                                            </option>
                                            {Object.keys(filterHash.price).map(
                                                (key) => (
                                                    <option
                                                        value={key}
                                                        key={uuidv4()}
                                                    >{`${key} (${filterHash.price[key]})`}</option>
                                                )
                                            )}
                                        </Form.Select>
                                    )}
                            </Col>
                            <Col className="my-1">
                                {/* DINING RESTRICTION FILTER  */}
                                {filterHash &&
                                    Object.keys(filterHash.diningRestriction)
                                        .length > 0 && (
                                        <Form.Select
                                            onChange={(e) => {
                                                handleChange(e);
                                                setField(
                                                    "restrictions",
                                                    e.target.value
                                                );
                                            }}
                                            value={filterState.restrictions}
                                            id="diningRestriction"
                                        >
                                            <option disabled value="DEFAULT">
                                                Restrictions
                                            </option>
                                            {Object.keys(
                                                filterHash.diningRestriction
                                            ).map((key) => (
                                                <option
                                                    value={key}
                                                    key={uuidv4()}
                                                >{`${key} (${filterHash.diningRestriction[key]})`}</option>
                                            ))}
                                        </Form.Select>
                                    )}
                            </Col>
                            <Col className="">
                                {/* RESET BUTTON  */}
                                {filterHash && (
                                    <Button
                                        className="my-1 w-100"
                                        onClick={() => {
                                            handleReset();
                                            setFilterState(() => {
                                                return {
                                                    cuisine: "DEFAULT",
                                                    location: "DEFAULT",
                                                    price: "DEFAULT",
                                                    restrictions: "DEFAULT",
                                                };
                                            });
                                        }}
                                    >
                                        Reset
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </Navbar.Collapse>
            </Navbar>
            {/* <Navbar bg="light" variant="light" expand="lg" className="">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Navbar.Brand className="mx-2">Most Popular</Navbar.Brand>
                    <Row xs={1} sm={1} md={1} lg={3}>
                        <Col className="w-100">
                            <Button>Top 3</Button>
                        </Col>
                    </Row>
                </Navbar.Collapse>
            </Navbar> */}
        </>
    );
};
