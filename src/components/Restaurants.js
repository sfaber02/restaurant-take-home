import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Modal, Button, Container, Row} from "react-bootstrap";
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
export const Restaurants = ({ restaurants, query, handleSearch }) => {
    /**
     * show - state to display modal of more detailed restaurant info
     * displayList - state which stores current list of restaurants to be displayed based
     *  on search/filters
     */
    const [show, setShow] = useState(false);
    const [displayList, setDisplayList] = useState();
    const [filterHash, setFilterHash] = useState();

    const navigate = useNavigate();

    /**
     * handlers to show/ hide modal
     */
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        navigate("/restaurants");
    };

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
    }, [query]);

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
                let {cuisine, location, price, diningRestriction} = restaurant;
                
                //hash cuisine
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
                if (!tempHash.diningRestriction[diningRestriction] && diningRestriction) {
                    tempHash.diningRestriction[diningRestriction] = 1;
                } else if (diningRestriction){
                    tempHash.diningRestriction[diningRestriction]++;
                }
            }

            //finally set the newly created hash as state
            setFilterHash(tempHash);
        }
    }, [displayList])

    return (
        <>
            {displayList && (
                <Container>
                    <FilterBar filterHash={filterHash} handleSearch={handleSearch} />
                    <Row xs={1} md={3} className="g-4">
                        {displayList.map((e) => (
                            <RestaurantCard
                                key={e.id}
                                info={e}
                                handleShow={handleShow}
                                handleClose={handleClose}
                            />
                        ))}
                    </Row>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        contentClassName="restaurantModal"
                        centered
                    >
                        <Modal.Body>
                            <Outlet />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            )}
        </>
    );
};
