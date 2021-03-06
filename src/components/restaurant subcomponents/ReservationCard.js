import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import {
    timeFormatter,
    phoneNumberFormatter,
} from "../../helper-functions/helpers";

import "../../styles/reservationCard.css";

/**
 * a single reservation card to be displayed in the list of reservations
 * @param {object} reservationInfo info on current reservation passed from <ReservationTab />
 * @param {number} reservationIndex index of current reservation - used to link reservation to it's correct element in array
 * @param {function} handleEditClick click handler for edit button passed from <ReservationTab />
 * @param {function} confirmCancelClick click handler for second click of cancel reservation button, passed from <ReservationTab />
 */
export const ReservationCard = ({
    reservationInfo,
    reservationIndex,
    handleEditClick,
    confirmCancelClick,
}) => {
    /** State to change delete button to second step of delete process
     * essentially an "Are you sure you want to delete?" mechanic **/
    const [deleteWarning, setDeleteWarning] = useState(false);

    const [borderColor, setBorderColor] = useState();

    // handles first click on "cancel" button - changes cancel to "Delete?" and "Back" buttons
    const handleCancelClick = (reservationInfo) => {
        setDeleteWarning(true);
    };

    // applies a border color based on reservation time
    useEffect(() => {
        const date = new Date(reservationInfo.time);
        const now = new Date();

        if (date < now) {
            setBorderColor("border border-2 border-danger"); // if date has passed set border to RED
        } else if (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        ) {
            setBorderColor("border border-2 border-success"); // if reservation is today set border to green
        } else {
            setBorderColor("border border-2 border-primary"); // if reservation is for a future day set border to blue
        }
    }, [reservationInfo]);

    return (
        <Card key={reservationInfo.id} className={`${borderColor} mb-3 p-3`}>
            <Card.Header>
                <strong>Time:</strong>
                {"  "}
                {timeFormatter(reservationInfo.time)}
            </Card.Header>
            <Card.Body></Card.Body>
            <Card.Text>
                <strong>Name:</strong>
                {"  "}
                {`${reservationInfo.firstName} ${reservationInfo.lastName}`}
            </Card.Text>
            <Row xs={1} md={2}>
                <Col>
                    <Card.Text>
                        <strong>Phone:</strong>
                        {"  "}
                        {phoneNumberFormatter(reservationInfo.phoneNumber)}
                    </Card.Text>
                </Col>
                <Col>
                    <Card.Text>
                        <strong>Guests:</strong>
                        {"  "}
                        {reservationInfo.numGuests}
                    </Card.Text>
                </Col>
            </Row>
            <Row xs={2} className="buttonContainer">
                <Col className="editButtonContainer">
                    {/* calls handleEditClick from <ReservationTab />  */}
                    <Button
                        className="mt-4"
                        id={reservationIndex}
                        onClick={handleEditClick}
                    >
                        Edit
                    </Button>
                </Col>
                <Col className="cancelButtonContainer">
                    {!deleteWarning ? (
                        <Button
                            className="mt-4"
                            variant="warning"
                            id={reservationIndex}
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </Button>
                    ) : (
                        <>
                            <Button
                                className="mt-4 buttons"
                                variant="danger"
                                id={reservationIndex}
                                // This is the delete reservation function in <ReservationTab />
                                onClick={confirmCancelClick}
                            >
                                Delete?
                            </Button>

                            <Button
                                className="mt-4 buttons"
                                variant="success"
                                onClick={() => setDeleteWarning(false)}
                            >
                                Back
                            </Button>
                        </>
                    )}
                </Col>
            </Row>
        </Card>
    );
};
