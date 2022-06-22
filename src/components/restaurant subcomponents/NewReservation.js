import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    Form,
    FormControl,
    Button,
    Container,
    Row,
    Col,
} from "react-bootstrap";

const API = process.env.REACT_APP_API_URL;

export const NewReservation = () => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    //update form state as user inputs information
    const setField = (field, value) => {
        setForm((prev) => {
            return {
                ...prev,
                [field]: value,
            };
        });

        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field])
            setErrors((prev) => {
                return {
                    ...prev,
                    [field]: null,
                };
            });
    };

    const findErrors = () => {};

    const handleSubmit = () => {};

    return (
        <Container fluid className="formContainer mb-4">
            <Form>
                {/* FIRST NAME INPUT  */}
                <Row xs={1} md={2}>
                    <Col>
                        <Form.Group className="mb-0 mt-1">
                            <Form.Label className="mb-0 mt-1">
                                First Name
                            </Form.Label>
                            <FormControl
                                type="text"
                                placeholder="First Name"
                                onChange={(e) =>
                                    setField("firstName", e.target.value)
                                }
                                isInvalid={!!errors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        {/* LAST NAME INPUT  */}
                        <Form.Group className="mb-0 mt-1">
                            <Form.Label className="mb-0 mt-1">
                                Last Name
                            </Form.Label>
                            <FormControl
                                type="text"
                                placeholder="Last Name"
                                onChange={(e) =>
                                    setField("lastName", e.target.value)
                                }
                                isInvalid={!!errors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row xs={1} md={2}>
                    <Col>
                        {/* PHONE INPUT  */}
                        <Form.Group>
                            <Form.Label className="mb-0 mt-1">
                                Phone Number
                            </Form.Label>
                            <FormControl
                                type="tel"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                placeholder="Phone Number"
                                onChange={(e) =>
                                    setField("phoneNumber", e.target.value)
                                }
                                isInvalid={!!errors.phoneNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phoneNumber}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        {/* EMAIL INPUT  */}
                        <Form.Group>
                            <Form.Label className="mb-0 mt-1">Email</Form.Label>
                            <FormControl
                                type="email"
                                placeholder="Email(optional)"
                                onChange={(e) =>
                                    setField("email", e.target.value)
                                }
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                {/* NUMBER OF GUEST INPUT  */}
                <Form.Group>
                    <Form.Label className="mb-0 mt-1">
                        Number of Guests
                    </Form.Label>
                    <FormControl
                        type="number"
                        placeholder="Number of Guests"
                        onChange={(e) => setField("numGuests", e.target.value)}
                        isInvalid={!!errors.location}
                    ></FormControl>
                    <Form.Control.Feedback type="invalid">
                        {errors.numGuests}
                    </Form.Control.Feedback>
                </Form.Group>
                
                {/* RESERVATION TIME INPUT  */}
                <Form.Group>
                    <Form.Label>Time</Form.Label>
                    <FormControl
                        type="time"
                        onChange={(e) =>
                            setField("time", e.target.value)
                        }
                        isInvalid={!!errors.time}
                    ></FormControl>
                    <Form.Control.Feedback type="invalid">
                        {errors.time}
                    </Form.Control.Feedback>
                </Form.Group>
                
                {/* DATE INPUT  */}
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <FormControl
                        type="date"
                        min={getTodaysDate()}
                        onChange={(e) =>
                            setField("date", e.target.value)
                        }
                        isInvalid={!!errors.date}
                    ></FormControl>
                    <Form.Control.Feedback type="invalid">
                        {errors.date}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-3 text-center">
                    <Button
                        variant="outline-success w-100"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
};


const getTodaysDate = () => {
  const today = new Date();
  const day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();

  if (month < 10) month = "0" + month;

  return (`${year}-${month}-${day}`);
}
