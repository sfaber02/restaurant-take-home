import React, { useState } from "react";
import { Card, Tabs, Tab } from "react-bootstrap";
import axios from "axios";


import { NewReservation } from "./NewReservation";
import { ReservationCard } from "./ReservationCard";

import "../../styles/reservationCard.css"

const API = process.env.REACT_APP_API_URL;

/**
 * component that displays two tabs -  all reservations and the edit/ make a reservation form
 * @param {number} id of current reservation
 * @param {object} currentRestaurant current restaurant info
 * @param {function} triggerRefetch function from <App />
 */
export const ReservationTab = ({ id, currentRestaurant, triggerRefetch }) => {
    /** state for current tab  */
    const [key, setKey] = useState("current");
    /** state to store form info for reservation to be edited */
    const [currentReservation, setCurrentReservation] = useState("");
    /** message for new update reservation */
    const [message, setMessage] = useState("");
    

    /**
     * gets reservation id from button id of edit button in a card reservation
     * and sets the currentReservation state to that reservation's info
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

    /** handles second delete click for a reservation in <ReservationCard /> */
    const confirmCancelClick = (e) => {
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
                <Tab eventKey="current" title="Reservations" className="resTab">
                    <Card>
                        <Card.Body>
                            {currentRestaurant.reservations[0] ? (
                                currentRestaurant.reservations.map((e, i) => {
                                    return (
                                        <ReservationCard
                                            reservationInfo={e}
                                            reservationIndex={i}
                                            key={i}
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
                {/* NEW / EDIT RESERVATION TAB  */}
                <Tab
                    eventKey="makeRes"
                    title="Make a Reservation"
                    className="resTab"
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
