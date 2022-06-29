import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Modal, Container, Row, Col} from "react-bootstrap";
import axios from "axios";

import { RestaurantCard } from "./restaurant subcomponents/RestaurantCard";
import { FilterBar } from "./restaurant subcomponents/FilterBar";


import "../styles/restaurants.css";

/**
 *
 * @param {array} array of all restaurants
 * @param {string} input from search
 * @returns a list of all restaurants if no search of filters are present
 * or a list of restaurants that match search and/ or filter
 *
 */
export const Restaurants = ({ restaurants, query }) => {
    // state to display modal of more detailed restaurant info
    const [show, setShow] = useState(false);
    // store the title for modal
    const [modalTitle, setModalTitle] = useState();
    // stores current list of restaurants to be displayed based on search/filters
    const [displayList, setDisplayList] = useState();
    //store an object of possible filter selections will rehash on each filter selection
    const [filterHash, setFilterHash] = useState();
    //store an array of the currently selected filters from filter bar
    const [filters, setFilters] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    /**
     * handlers to show/ hide modal
     */
    const handleShow = (info) => {
        setShow(true);
        setModalTitle(info.name);
    };
    const handleClose = () => {
        setShow(false);
        navigate("/restaurants");
    };

    /**
     * Called from <FilterBar /> when a new filter is selected
     * @param {string} filter - the actual filter that was selected
     * @param {string} type - the type of filter (ex - "cuisine" or "price")
     */
    const handleFilter = (filter, type) => {
        setFilters((prev) => {
            return [...prev, { filter, type }];
        });
    };

    //resets filter bar when reset button is clicked
    const handleReset = () => {
        setFilters([]);
        setDisplayList(restaurants);
    };

    // if user landed on restaurants page via home page carousel
    // turn modal display on and set modal title to matching restaurant
    useEffect(() => {
        if (id) {
            for (let restaurant of restaurants) {
                if (restaurant.id === id) {
                    setModalTitle(restaurant.name);
                }
            }
            setShow(true);
        }
    }, [id]);

    /**
     * runs on component load and when search query changes
     * if no query is present display all restaurants
     * if query is present perform a search on the backend for matches
     * if there are matches get their ids and match them against restaurants from the all restaurants array
     * the reason for this is because there are static images attached to each restaurant from the initial fetch
     * if this was the real world I assume their would be images on the backend associated with each restaurant
     * and this wouldn't be needed.
     */
    useEffect(() => {
        if (query) {
            const config = {
                method: "get",
                url: `https://shawn-takehome-api.herokuapp.com/api/restaurants?&searchTerm=${query}`,
            };

            axios(config)
                .then((response) => {
                    const ids = response.data.restaurants.map((e) => e.id);
                    let tempList = [];
                    for (let id of ids) {
                        for (let restaurant of restaurants) {
                            if (id === restaurant.id) {
                                tempList.push(restaurant);
                            }
                        }
                    }
                    setDisplayList(tempList);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setDisplayList(restaurants);
        }
    }, [query, restaurants]);

    /**
     * Create a hash table of all filterable fields and their counts
     * based off what is currently being displayed.
     * This will ultimately narrow things down to the point where all filters will
     * need to be reset, because the hash will update the display list
     * not ideal but we'll call this v1.  maybe add a search results state?
     */
    useEffect(() => {
        if (displayList) {
            let tempHash = {
                cuisine: {},
                location: {},
                price: {},
                diningRestriction: {},
            };
            for (let restaurant of displayList) {
                let { cuisine, location, price, diningRestriction } =
                    restaurant;

                // hash cuisine
                if (!tempHash.cuisine[cuisine]) {
                    tempHash.cuisine[cuisine] = 1;
                } else {
                    tempHash.cuisine[cuisine]++;
                }

                //hash location
                if (!tempHash.location[location]) {
                    tempHash.location[location] = 1;
                } else {
                    tempHash.location[location]++;
                }

                //hash price
                if (!tempHash.price[price]) {
                    tempHash.price[price] = 1;
                } else {
                    tempHash.price[price]++;
                }

                //hash dining restriction if not null
                if (
                    !tempHash.diningRestriction[diningRestriction] &&
                    diningRestriction
                ) {
                    tempHash.diningRestriction[diningRestriction] = 1;
                } else if (diningRestriction) {
                    tempHash.diningRestriction[diningRestriction]++;
                }
            }

            //finally set the newly created hash as state
            setFilterHash(tempHash);
        }
    }, [displayList]);

    // filter display list based on user's filter selection
    useEffect(() => {
        if (filters.length > 0 && displayList) {
            for (let filter of filters) {
                setDisplayList((prev) => {
                    return prev.filter((e) =>
                        e[filter.type] === filter.filter ? true : false
                    );
                });
            }
        }

        //disabled dependency warning because react is demanding I add displaylist to
        //the dependency array causing an infinite loop...I think???
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, restaurants]);

    return (
        <>
            {displayList && (
                <Container>
                    <FilterBar
                        filterHash={filterHash}
                        handleFilter={handleFilter}
                        handleReset={handleReset}
                    />
                    <Row xs={1} md={2} lg={3} className="g-0">
                        {displayList.map((e) => (
                            <Col className="p-1" key={e.id}>
                                <RestaurantCard
                                    key={e.id}
                                    info={e}
                                    handleShow={handleShow}
                                    handleClose={handleClose}
                                />
                            </Col>
                        ))}
                    </Row>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        contentClassName="restaurantModal"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="mt-0 p-0">
                            <Outlet context={handleClose} />
                        </Modal.Body>
                    </Modal>
                </Container>
            )}
        </>
    );
};
