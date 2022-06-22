import React from "react";
import { Card, Row, Col, Button, Tabs, Tab } from "react-bootstrap";

import { NewReservation } from "./NewReservation";

import { timeFormatter, phoneNumberFormatter } from "../../helper-functions/helpers";

export const ReservationTab = ({ id, current }) => {
    console.log(current);

    return (
        <>
            <Tabs>
                {/* VIEW CURRENT RESERVATION TABS */}
                <Tab eventKey="current" title="Current Reservations">
                    <Card>
                        <Card.Body>
                            {current.reservations[0] ? (
                                current.reservations.map((e) => {
                                    return (
                                        <>
                                            <Card key={e.id} className="border border-info mb-3 p-3">
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
                                                            <strong>
                                                                Phone:
                                                            </strong>
                                                            {"  "}
                                                            {phoneNumberFormatter(
                                                                e.phoneNumber
                                                            )}
                                                        </Card.Text>
                                                    </Col>
                                                    <Col>
                                                        <Card.Text>
                                                            <strong>
                                                                Guests:
                                                            </strong>
                                                            {"  "}
                                                            {e.numGuests}
                                                        </Card.Text>
                                                    </Col>
                                                </Row>
                                                <Button className="mt-4">
                                                    Edit
                                                </Button>
                                            </Card>
                                        </>
                                    );
                                })
                            ) : (
                                <Card.Text>No Reservations</Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                </Tab>
                <Tab eventKey="makeRes" title="Make a Reservation">
                    <NewReservation current={current} />
                </Tab>
            </Tabs>
        </>
    );
};


