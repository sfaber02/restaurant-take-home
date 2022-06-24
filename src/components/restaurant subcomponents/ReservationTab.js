import React, { useState } from "react";
import { Card, Row, Col, Button, Tabs, Tab } from "react-bootstrap";

import { NewReservation } from "./NewReservation";

import {
    timeFormatter,
    phoneNumberFormatter,
} from "../../helper-functions/helpers";

export const ReservationTab = ({ id, currentRestaurant }) => {
    const [key, setKey] = useState("current");
    const [currentReservation, setCurrentReservation] = useState("");

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
                }}
            >
                {/* VIEW CURRENT RESERVATION TABS */}
                <Tab eventKey="current" title="Reservations">
                    <Card>
                        <Card.Body>
                            {currentRestaurant.reservations[0] ? (
                                currentRestaurant.reservations.map((e, i) => {
                                    return (
                                        <Card
                                            key={e.id}
                                            className="border border-info mb-3 p-3"
                                        >
                                            <Card.Header>
                                                <strong>Time:</strong>
                                                {"  "}
                                                {timeFormatter(e.time)}
                                            </Card.Header>
                                            <Card.Body></Card.Body>
                                            <Card.Text>
                                                <strong>Name:</strong>
                                                {"  "}
                                                {`${e.firstName} ${e.lastName}`}
                                            </Card.Text>
                                            <Row xs={1} md={2}>
                                                <Col>
                                                    <Card.Text>
                                                        <strong>Phone:</strong>
                                                        {"  "}
                                                        {phoneNumberFormatter(
                                                            e.phoneNumber
                                                        )}
                                                    </Card.Text>
                                                </Col>
                                                <Col>
                                                    <Card.Text>
                                                        <strong>Guests:</strong>
                                                        {"  "}
                                                        {e.numGuests}
                                                    </Card.Text>
                                                </Col>
                                            </Row>
                                            <Button
                                                className="mt-4"
                                                id={i}
                                                onClick={handleEditClick}
                                            >
                                                Edit
                                            </Button>
                                        </Card>
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
                        currentRestaurant={currentRestaurant}
                        id={id}
                        currentReservation={currentReservation}
                    />
                </Tab>
            </Tabs>
        </>                     
    );
};
