import React, { useState, useEffect } from "react";
import { Navbar, Form, FormControl, Container } from "react-bootstrap";

export const FilterBar = ({ filterHash }) => {
    console.log(filterHash);
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
                    <Form.Select>
                        <option>Cuisine</option>
                        {filters.cuisine.map((e) => (
                            <option value={e[0]}>{`${e[0]}(${e[1]})`}</option>
                        ))}
                    </Form.Select>
                )}
                {filters && filters.location.length > 0 && (
                    <Form.Select>
                        <option>Location</option>
                        {filters.location.map((e) => (
                            <option value={e[0]}>{`${e[0]}(${e[1]})`}</option>
                        ))}
                    </Form.Select>
                )}
                {filters && filters.price.length > 0 && (
                    <Form.Select>
                        <option>Price</option>
                        {filters.price.map((e) => (
                            <option value={e[0]}>{`${e[0]}(${e[1]})`}</option>
                        ))}
                    </Form.Select>
                )}
                {filters && filters.diningRestriction.length > 0 && (
                    <Form.Select>
                        <option>Restrictions</option>
                        {filters.diningRestriction.map((e) => (
                            <option value={e[0]}>{`${e[0]}(${e[1]})`}</option>
                        ))}
                    </Form.Select>
                )}
                {/* <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse> */}
            </Container>
        </Navbar>
    );
};
