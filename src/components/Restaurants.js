import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Modal, Button, Container, Row } from "react-bootstrap";

import { RestaurantCard } from "./restaurant subcomponents/RestaurantCard";

import "../styles/restaurants.css";

export const Restaurants = ({ restaurants }) => {
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        navigate("/restaurants");
    };

    return (
        <Container>
            <Row xs={1} md={3} className="g-4">
                {restaurants.map((e) => (
                    <RestaurantCard
                        key={e.id}
                        info={e}
                        handleShow={handleShow}
                        handleClose={handleClose}
                    />
                ))}
            </Row>
            <Modal
                show={show}
                onHide={handleClose}
                contentClassName="restaurantModal"
                centered
            >
                <Modal.Body>
                    <Outlet />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

/* 
{restaurants.map((e) => (
                <RestaurantCard
                    key={e.id}
                    info={e}
                    handleShow={handleShow}
                    handleClose={handleClose}
                />
            ))}

*/
