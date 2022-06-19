import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { Card, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";

import "../../styles/restaurantCard.css";
import graphics from "../../assets/Graphics/Graphics.js";

export const RestaurantCard = ({ info, handleShow }) => {
    const { id, name, description, price, location, cuisine, graphic } = info;

    const navigate = useNavigate();

    const handleClick = (e) => {
        console.log (id);
        handleShow();
        navigate(`${id}`);
    }

    return (
        <Card onClick={handleClick} id={id}>
            <Card.Img
                variant="top"
                src={graphic}
            />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text className="cardText">{`${description.split('.')[0]}.`}</Card.Text>
            </Card.Body>

            <Row className="border">
                <Col>
                    <Card.Text className="cardText">{price}</Card.Text>
                </Col>
                <Col>
                    <Card.Text className="cardText">{cuisine}</Card.Text>
                </Col>
                <Col>
                    <Card.Text className="cardText">{location}</Card.Text>
                </Col>
                <Col>
                    <Link to={`${id}`} state={info} onClick={handleShow}>
                        More Info
                    </Link>
                </Col>
            </Row>
            <Card.Body></Card.Body>
        </Card>
    );
};
