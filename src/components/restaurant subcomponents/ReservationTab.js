import React, { useState } from "react";
import { Card, Row, Col, Button, Tabs, Tab } from "react-bootstrap";

import { NewReservation } from "./NewReservation";
import { ReservationCard } from "./ReservationCard";

import {
    timeFormatter,
    phoneNumberFormatter,
} from "../../helper-functions/helpers";

export const ReservationTab = ({ id, currentRestaurant, triggerRefetch }) => {
    const [key, setKey] = useState("current");
    const [currentReservation, setCurrentReservation] = useState("");
    /** message for new update reservation */
    const [message, setMessage] = useState("");

    const handleEditClick = (e) => {
        setCurrentReservation(
            currentRestaurant.reservations[Number(e.target.id)]
        );
        setKey("makeRes");
    };

    return (
        <>
            <Tabs
                activeKey={key}
                onSelect={(k) => {
                    setKey(k);
                    setCurrentReservation("");
                   setMessage('');
                }}
            >
                {/* VIEW CURRENT RESERVATION TABS */}
                <Tab eventKey="current" title="Reservations">
                    <Card>
                        <Card.Body>
                            {currentRestaurant.reservations[0] ? (
                                currentRestaurant.reservations.map((e, i) => {
                                    return (
                                        <ReservationCard e={e} i={i} handleEditClick={handleEditClick}/>
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
