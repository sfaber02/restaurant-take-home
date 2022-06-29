import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { Card, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import axios from "axios";

import { ReservationTab } from "./ReservationTab";

import "../../styles/restaurant.css";

import {phoneNumberFormatter, hoursFormatter} from '../../helper-functions/helpers.js';

const API = process.env.REACT_APP_API_URL;

/**
 * a card to be displayed in the modal for when the user clicks
 * on a restaurant in the restaurants component
 * @param {array} restaurants all restaurant info from fetch in <App />
 * @param {function} triggerRefetch function from <App />
 */
export const Restaurant = ({ restaurants, triggerRefetch }) => {
    //stores current restaurant to be displayed in card
    const [current, setCurrent] = useState(null);

    // State to change delete button to second step of delete process
    // essentially an "Are you sure you want to delete?" mechanic
    const [deleteWarning, setDeleteWarning] = useState(false);

    //id of restaurant from link clicked in restaurants component
    const { id } = useParams();

    // handleClose function to close modal passed from restaurants component
    const handleClose = useOutletContext();

    const navigate = useNavigate();

    /**
     * search through all restaurant to find restaurant that matches
     * id from route params, set current state accordingly
     */
    useEffect(() => {
        setCurrent(restaurants.filter((e) => e.id === id)[0]);
    }, [id, restaurants]);

    //delete click handler
    const handleDeleteClick = (e) => {
        setDeleteWarning(true);
    };

    //second delete click to perform actual delete operation
    const confirmDeleteClick = () => {
        const config = {
            method: "delete",
            url: `${API}/restaurants/${id}`,
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                triggerRefetch();
                handleClose();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //cancel delete
    const goBackClick = () => {
        setDeleteWarning(false);
    };

    //handle edit click
    const handleEditClick = () => {
        navigate(`/newRestaurant/${id}`);
    };

    /**
     * return a single card for the restaurant user clicked on
     * which displays all info about that restaurantn in a modal as well as
     * links to close the modal or make a reservation
     */
    return (
        <>
            {current && (
                <Card id={current.id}>
                    <Card.Body>
                        <Card.Img
                            variant="top"
                            className="p-0 m-0"
                            src={current.graphic}
                        />
                        <Tabs
                            defaultActiveKey="info"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            {/* INFO TAB */}
                            <Tab eventKey="info" title="Info">
                                <Row xs={1} md={2}>
                                    <Col>
                                        <Card.Text>
                                            <strong>Phone: </strong>
                                            {phoneNumberFormatter(
                                                current.phoneNumber
                                            )}
                                        </Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>
                                            <strong>Hours: </strong>
                                            {hoursFormatter(
                                                current.openingTime,
                                                current.closingTime
                                            )}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <Row xs={1} md={2}>
                                    <Col>
                                        <Card.Text>
                                            <strong>Location: </strong>
                                            {current.location}
                                        </Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>
                                            <strong>Cuisine: </strong>
                                            {current.cuisine}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                {current.diningRestriction && (
                                    <Card.Text>
                                        <strong>Restrictions: {"   "}</strong>
                                        {current.diningRestriction}
                                    </Card.Text>
                                )}
                                <Card.Footer className="border border-secondary">
                                    <Card.Text className="cardText">
                                        {current.description}
                                    </Card.Text>
                                </Card.Footer>
                            </Tab>
                            {/* RESERVATIONS TAB  */}
                            <Tab eventKey="reservations" title="Reservations">
                                <ReservationTab
                                    id={id}
                                    currentRestaurant={current}
                                    triggerRefetch={triggerRefetch}
                                />
                            </Tab>
                            {/* ADMIN TAB */}
                            <Tab eventKey="admin" title="Admin">
                                <Row xs={2}>
                                    <Col className="editButtonContainer">
                                        <Button onClick={handleEditClick}>
                                            Edit
                                        </Button>
                                    </Col>
                                    <Col className="deleteButtonContainer">
                                        {!deleteWarning ? (
                                            <Button
                                                variant="warning"
                                                onClick={handleDeleteClick}
                                                className="buttons"
                                            >
                                                Delete
                                            </Button>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="danger"
                                                    onClick={confirmDeleteClick}
                                                    className="buttons"
                                                >
                                                    DELETE?
                                                </Button>
                                                <Button
                                                    variant="success"
                                                    onClick={goBackClick}
                                                    className="buttons"
                                                >
                                                    Back
                                                </Button>
                                            </>
                                        )}
                                    </Col>
                                </Row>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            )}
        </>
    );
};



