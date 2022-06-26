import React, {useState} from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import {
    timeFormatter,
    phoneNumberFormatter,
} from "../../helper-functions/helpers";

export const ReservationCard = ({
    e,
    i,
    handleEditClick,
    confirmCancelClick,
}) => {
    /** State to change delete button to second step of delete process
     * essentially an "Are you sure you want to delete?" mechanic **/
    const [deleteWarning, setDeleteWarning] = useState(false);

    const handleCancelClick = (e) => {
        setDeleteWarning(true);
    };

    return (
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
                        <strong>Phone:</strong>
                        {"  "}
                        {phoneNumberFormatter(e.phoneNumber)}
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
            <Row xs={3}>
                <Col>
                    <Button className="mt-4" id={i} onClick={handleEditClick}>
                        Edit
                    </Button>
                </Col>
                <Col>
                    {!deleteWarning ? (
                        <Button
                            className="mt-4"
                            variant="warning"
                            id={i}
                            onClick={handleCancelClick}
                        >
                            Cancel Reservation
                        </Button>
                    ) : (
                        <>
                            <Button
                                className="mt-4"
                                variant="danger"
                                id={i}
                                onClick={confirmCancelClick}
                            >
                                Are You Sure?
                            </Button>
                            <Button
                                className="mt-4"
                                variant="success"
                                onClick={() => setDeleteWarning(false)}
                            >
                                Go Back
                            </Button>
                        </>
                    )}
                </Col>
            </Row>
        </Card>
    );
};
