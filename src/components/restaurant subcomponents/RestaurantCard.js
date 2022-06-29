import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

import "../../styles/restaurantCard.css";

/**
 * a single restaurant card with limited info to be displayed
 * in the all restaurants view
 * @param {object} info for a single restaurant 
 * @param {object} handleShow function from restaurants component to trigger modal display 
 */
export const RestaurantCard = ({ info, handleShow }) => {
    const { id, name, description, price, location, cuisine, graphic } = info;

    const navigate = useNavigate();

    /** Click handler for user clicks on card will navigate to
     * dynamic restaurant route for a more detailed view of a single restaurant
     */
    const handleClick = () => {
        handleShow(info);
        navigate(`${id}`);
    }

    return (
        <Card onClick={handleClick} id={id} className="h-100 border">
            <Card.Img
                style={{ objectFit: "cover" }}
                className="h-50"
                variant="top"
                src={graphic}
            />

            <Card.Header>
                <Row xs={2}>
                    <Card.Title>
                        {name}
                    </Card.Title>
                    <Card.Text
                        style={{ textAlign: "right" }}
                    >
                        {location}
                    </Card.Text>
                </Row>
            </Card.Header>

            <Card.Body>
                <Card.Text className="cardText">{`${
                    description.split(".")[0]
                }.`}</Card.Text>
            </Card.Body>

            <Card.Footer>
                <Row >
                    <Col>
                        <Card.Text
                            style={{ textAlign: "left" }}
                        >
                            {price}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text
                            className="cardText"
                            style={{ textAlign: "center" }}
                        >
                            {cuisine}
                        </Card.Text>
                    </Col>
                    <Col className="d-flex justify-content-end">
                            <Link
                                to={`${id}`}
                                state={info}
                                onClick={handleShow}
                            >
                                More Info
                            </Link>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
};
