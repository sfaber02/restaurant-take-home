import React, { useState } from "react";
import { Card, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import axios from "axios";


import { NewReservation } from "./NewReservation";
import { ReservationCard } from "./ReservationCard";

import {
    timeFormatter,
    phoneNumberFormatter,
} from "../../helper-functions/helpers";

const API = process.env.REACT_APP_API_URL;

export const ReservationTab = ({ id, currentRestaurant, triggerRefetch }) => {
    /** state for current tab  */
    const [key, setKey] = useState("current");
    /** state to store form info for reservation to be edited */
    const [currentReservation, setCurrentReservation] = useState("");
    /** message for new update reservation */
    const [message, setMessage] = useState("");
    

    /**
     * gets reservation id from button id of edit button a reservation
     * and sets the currentReservation state that reservations info
     * this will populate the reservation form with the info of the reservation
     * to be edited.
     * @param {object} event
     */
    const handleEditClick = (e) => {
        setCurrentReservation(
            currentRestaurant.reservations[Number(e.target.id)]
        );
        setKey("makeRes");
    };

    const confirmCancelClick = (e) => {
        console.log(currentRestaurant.reservations[Number(e.target.id)].id);
        const id = currentRestaurant.reservations[Number(e.target.id)].id;

        const config = {
            method: "delete",
            url: `${API}/reservations/${id}`,
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                triggerRefetch();
                // handleClose();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Tabs
                activeKey={key}
                onSelect={(k) => {
                    setKey(k);
                    setCurrentReservation("");
                    setMessage("");
                }}
            >
                {/* VIEW CURRENT RESERVATION TABS */}
                <Tab eventKey="current" title="Reservations">
                    <Card>
                        <Card.Body>
                            {currentRestaurant.reservations[0] ? (
                                currentRestaurant.reservations.map((e, i) => {
                                    return (
                                        <ReservationCard
                                            e={e}
                                            i={i}
                                            handleEditClick={handleEditClick}
                                            confirmCancelClick={
                                                confirmCancelClick
                                            }
                                        />
                                    );
                                })
                            ) : (
                                <Card.Text>No Reservations</Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                </Tab>
                <Tab
                    eventKey="makeRes"
                    title="Make a Reservation"
                    className="m-0 p-0"
                >
                    <NewReservation
                        triggerRefetch={triggerRefetch}
                        currentRestaurant={currentRestaurant}
                        id={id}
                        currentReservation={currentReservation}
                        setMessage={setMessage}
                        message={message}
                    />
                </Tab>
            </Tabs>
        </>
    );
};
