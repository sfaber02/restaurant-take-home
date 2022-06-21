import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

import "../../styles/restaurantCard.css";

/**
 * 
 * @param {object} info for a single restaurant 
 * @param {object} function from restaurants component to trigger modal display 
 * @returns a single restaurant card with limited info to be displayed
 * in the all restaurants view
 */
export const RestaurantCard = ({ info, handleShow }) => {
    const { id, name, description, price, location, cuisine, graphic } = info;

    const navigate = useNavigate();

    /** Click handler for user clicks on card will navigate to
     * dynamic restaurant route for a more detailed view of a single restaurant
     */
    const handleClick = () => {
        handleShow();
        navigate(`${id}`);
    }

    return (
        <Card onClick={handleClick} id={id} className="h-100">
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
