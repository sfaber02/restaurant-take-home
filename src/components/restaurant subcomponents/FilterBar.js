import React, { useState, useEffect } from "react";
import { Navbar, Form, Container, Button } from "react-bootstrap";

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

    //responds to changes made in the filter bar selections
    const handleChange = (e) => handleFilter(e.target.value, e.target.id);

    const setField = (field, value) => {
        setFilterState((prev) => {
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    return (
        <Navbar bg="dark" variant="light" expand="lg" className="border">
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
            {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
            <Container>

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

                {/* DINING RESTRICTION FILTER  */}
                {filters && filters.diningRestriction.length > 0 && (
                    <Form.Select
                        onChange={(e) => {
                            handleChange(e);
                            setField("restrictions", e.target.value);
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

                {/* RESET BUTTON  */}
                {filters && (
                    <Button className=""
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
            </Container>
            {/* </Navbar.Collapse> */}
        </Navbar>
    );
};
