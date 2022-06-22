import React from "react";
import { Card, Row, Col, Button, Tabs, Tab } from "react-bootstrap";

export const ReservationTab = ({ id, current }) => {
    console.log(current);

    return (
        <>
            <Tabs>
                <Tab eventKey="current" title="Current Reservations">
                    <Card>
                        <Card.Body>
                            {current.reservations[0] ? (
                                current.reservations.map((e) => {
                                    return (
                                        <>
                                            <Card className="border border-info mb-3 p-3">
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
                                                <Button className="mt-4">Edit</Button>
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
                <Tab eventKey="makeRes" title="Make a Reservation"></Tab>
            </Tabs>
        </>
    );
};

const timeFormatter = (time) => {
    // extract date from time string
    const tempDate = new Date(time);
    const date = tempDate.toDateString();

    //extract hours from time string
    time = time.split("T")[1];
    let hours = time.split(":")[0];
    const amPm = hours > 12 ? "PM" : "AM";
    hours = hours > 12 ? hours - 12 : hours;

    //extract minutes from time string
    let minutes = time.split(":")[1];

    return `${date} ${hours}:${minutes}${amPm}`;
};

//format phone number for info section
const phoneNumberFormatter = (phone) => {
    return `(${phone[0]}${phone[1]}${phone[2]}) ${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}${phone[8]}${phone[9]}`;
};
