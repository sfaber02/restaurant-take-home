import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { Card, Row, Col, Tabs, Tab, Container, Button } from "react-bootstrap";
import axios from "axios";

import { ReservationTab } from "./ReservationTab";

import "../../styles/restaurant.css";

const {phoneNumberFormatter} =  require('../../helper-functions/helpers.js');

const API = process.env.REACT_APP_API_URL;

/**
 *
 * @param {array} all restaurant info
 * @returns a card to be displayed in the modal for when the user clicks
 * on a restaurant in the restaurants component
 */
export const Restaurant = ({ restaurants }) => {
    //stores current restaurant to be displayed in card
    const [current, setCurrent] = useState(null);
    const [deleteWarning, setDeleteWarning] = useState(false);

    //id of restaurant from link clicked in restaurants component
    const { id } = useParams();

    // handleClose function to close modal passed from restaurants component
    const handleClose = useOutletContext();

    /**
     * search through all restaurant to find restaurant that matches
     * id from route params, set current state accordingly
     */
    useEffect(() => {
        setCurrent(restaurants.filter((e) => e.id === id)[0]);
    }, [id]);

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
    const handleEditClick = (e) => {};

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
                                <ReservationTab id={id} current={current} />
                            </Tab>
                            {/* ADMIN TAB */}
                            <Tab eventKey="admin" title="Admin">
                                <Row xs={2} md={2}>
                                    <Col>
                                        <Button onClick={handleEditClick}>
                                            Edit
                                        </Button>
                                    </Col>
                                    <Col style={{ textAlign: "right" }}>
                                        {!deleteWarning ? (
                                            <Button
                                                variant="warning"
                                                onClick={handleDeleteClick}
                                            >
                                                Delete
                                            </Button>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="success"
                                                    onClick={goBackClick}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={confirmDeleteClick}
                                                >
                                                    DELETE
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


//format open / close times for info section
//ADD THIS TO HELPER FUNCTIONS
const hoursFormatter = (open, close) => {
    open = open.split(":");
    close = close.split(":");
    console.log(open);
    let openHours =
        open[0] > 12
            ? `${open[0] - 12}:${open[1]}PM`
            : `${open[0]}:${open[1]}AM`;
    let closeHours =
        close[0] > 12
            ? `${close[0] - 12}:${close[1]}PM`
            : `${close[0]}:${close[1]}AM`;

    return `${openHours} - ${closeHours}`;
};
