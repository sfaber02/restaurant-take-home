import React, { useState, useEffect } from "react";
import { Navbar, Form, Container, Button, Row, Col } from "react-bootstrap";

export const FilterBar = ({ filterHash, handleFilter, handleReset }) => {
    /**
     * filters -  stores all the current available filter options
     * filterState - stores all current filter selections
     */
    const [filters, setFilters] = useState();
    const [filterState, setFilterState] = useState(() => {
        return {
            cuisine: "DEFAULT",
            location: "DEFAULT",
            price: "DEFAULT",
            restrictions: "DEFAULT",
        };
    });

    /**
     * take hash created in restaurants and create iterable objects
     * for mapping form option items
     */
    useEffect(() => {
        if (filterHash) {
            let tempHash = {
                cuisine: [],
                location: [],
                price: [],
                diningRestriction: [],
            };
            if (Object.keys(filterHash.cuisine).length > 0) {
                for (let key in filterHash.cuisine) {
                    tempHash.cuisine.push([key, filterHash.cuisine[key]]);
                }
            }
            if (Object.keys(filterHash.location).length > 0) {
                for (let key in filterHash.location) {
                    tempHash.location.push([key, filterHash.location[key]]);
                }
            }
            if (Object.keys(filterHash.price).length > 0) {
                for (let key in filterHash.price) {
                    tempHash.price.push([key, filterHash.price[key]]);
                }
            }
            if (Object.keys(filterHash.diningRestriction).length > 0) {
                for (let key in filterHash.diningRestriction) {
                    tempHash.diningRestriction.push([
                        key,
                        filterHash.diningRestriction[key],
                    ]);
                }
            }
            setFilters(tempHash);
        }
    }, [filterHash]);

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
        <Navbar bg="light" variant="light" expand="lg" className="">
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Brand className="mx-2">Filters</Navbar.Brand>
                <Container className="border mt-2">
                    <Row xs={1} sm={1} md={1} lg={5}>
                        <Col className="my-1">
                            {/* LOCATION FILTERS  */}
                            {filters && filters.location.length > 0 && (
                                <Form.Select
                                    onChange={(e) => {
                                        handleChange(e);
                                        setField("location", e.target.value);
                                    }}
                                    value={filterState.location}
                                    id="location"
                                >
                                    <option disabled value="DEFAULT">
                                        Location
                                    </option>
                                    {filters.location.map((e) => (
                                        <option
                                            key={`${e[0]}${e[1]}`}
                                            value={e[0]}
                                        >{`${e[0]}(${e[1]})`}</option>
                                    ))}
                                </Form.Select>
                            )}
                        </Col>
                        <Col className="my-1">
                            {/* CUISINE FILTERS  */}
                            {filters && filters.cuisine.length > 0 && (
                                <Form.Select
                                    onChange={(e) => {
                                        handleChange(e);
                                        setField("cuisine", e.target.value);
                                    }}
                                    value={filterState.cuisine}
                                    id="cuisine"
                                >
                                    <option disabled value="DEFAULT">
                                        Cuisine
                                    </option>
                                    {filters.cuisine.map((e) => (
                                        <option
                                            key={`${e[0]}${e[1]}`}
                                            value={e[0]}
                                        >{`${e[0]}(${e[1]})`}</option>
                                    ))}
                                </Form.Select>
                            )}
                        </Col>
                        <Col className="my-1">
                            {/* PRICE FILTERS  */}
                            {filters && filters.price.length > 0 && (
                                <Form.Select
                                    onChange={(e) => {
                                        handleChange(e);
                                        setField("price", e.target.value);
                                    }}
                                    value={filterState.price}
                                    id="price"
                                >
                                    <option disabled value="DEFAULT">
                                        Price
                                    </option>
                                    {filters.price.map((e) => (
                                        <option
                                            key={`${e[0]}${e[1]}`}
                                            value={e[0]}
                                        >{`${e[0]}(${e[1]})`}</option>
                                    ))}
                                </Form.Select>
                            )}
                        </Col>
                        <Col className="my-1">
                            {/* DINING RESTRICTION FILTER  */}
                            {filters && filters.diningRestriction.length > 0 && (
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
                                    {filters.diningRestriction.map((e) => (
                                        <option
                                            key={`${e[0]}${e[1]}`}
                                            value={e[0]}
                                        >{`${e[0]}(${e[1]})`}</option>
                                    ))}
                                </Form.Select>
                            )}
                        </Col>
                        <Col className="">
                            {/* RESET BUTTON  */}
                            {filters && (
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
    );
};
