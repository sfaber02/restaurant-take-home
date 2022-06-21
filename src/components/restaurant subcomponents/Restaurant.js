import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

import "../../styles/restaurant.css";

/**
 * 
 * @param {array} all restaurant info 
 * @returns a card to be displayed in the modal for when the user clicks
 * on a restaurant in the restaurants component
 */
export const Restaurant = ({ restaurants }) => {
    //stores current restaurant to be displayed in card
    const [current, setCurrent] = useState(null);
    //id of restaurant from link clicked in restaurants component
    const { id } = useParams();

    
    /**
     * search through all restaurant to find restaurant that matches
     * id from route params, set current state accordingly
     */
    useEffect(() => {
        setCurrent(restaurants.filter((e) => e.id === id)[0]);
    }, [id]);

   /**
    * return a single card for the restaurant user clicked on
    * which displays all info about that restaurantn as well as
    * links to close the modal or make a reservation
    */
    return (
        <>
            {current && (
                <Card id={current.id}>
                    <Card.Img variant="top" src={current.graphic} />
                    <Card.Body>
                        <Card.Title>{current.name}</Card.Title>
                        <Card.Text className="cardText">
                            {current.description}
                        </Card.Text>
                    </Card.Body>

                    <Row className="border">
                        <Col>
                            <Card.Text className="cardText">
                                {current.price}
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text className="cardText">
                                {current.cuisine}
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text className="cardText">
                                {current.location}
                            </Card.Text>
                        </Col>
                    </Row>
                    <Card.Footer></Card.Footer>
                </Card>
            )}
        </>
    );
};
