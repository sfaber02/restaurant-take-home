import React, { useState, useEffect } from "react";
import { Navbar, Form, Container, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export const FilterBar = ({ filterHash, handleFilter, handleReset}) => {

    const [filters, setFilters] = useState();

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

    //responds to changes made in the filter bar selections
    const handleChange = (e) => handleFilter(e.target.value, e.target.id);

    return (
        <Navbar
            bg="dark"
            variant="light"
            expand="lg"
            // sticky="top"
            className="border"
        >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Container>
                {filters && filters.cuisine.length > 0 && (
                    <Form.Select onChange={handleChange} id="cuisine">
                        <option disabled selected>Cuisine</option>
                        {filters.cuisine.map((e) => (
                            <option
                                key={`${e[0]}${e[1]}`}
                                value={e[0]}
                            >{`${e[0]}(${e[1]})`}</option>
                        ))}
                    </Form.Select>
                )}
                {filters && filters.location.length > 0 && (
                    <Form.Select onChange={handleChange} id="location">
                        <option disabled selected>Location</option>
                        {filters.location.map((e) => (
                            <option
                                key={`${e[0]}${e[1]}`}
                                value={e[0]}
                            >{`${e[0]}(${e[1]})`}</option>
                        ))}
                    </Form.Select>
                )}
                {filters && filters.price.length > 0 && (
                    <Form.Select onChange={handleChange} id="price">
                        <option disabled selected>Price</option>
                        {filters.price.map((e) => (
                            <option
                                key={`${e[0]}${e[1]}`}
                                value={e[0]}
                            >{`${e[0]}(${e[1]})`}</option>
                        ))}
                    </Form.Select>
                )}
                {filters && filters.diningRestriction.length > 0 && (
                    <Form.Select onChange={handleChange} id="diningRestriction">
                        <option disabled selected>Restrictions</option>
                        {filters.diningRestriction.map((e) => (
                            <option
                                key={`${e[0]}${e[1]}`}
                                value={e[0]}
                            >{`${e[0]}(${e[1]})`}</option>
                        ))}
                    </Form.Select>
                )}
                {filters && <Button onClick={handleReset}>Reset</Button>}
                {/* <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse> */}
            </Container>
        </Navbar>
    );
};
