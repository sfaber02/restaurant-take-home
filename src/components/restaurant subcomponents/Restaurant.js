import React, {useState, useEffect} from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";


import "../../styles/restaurant.css";
import graphics from "../../assets/Graphics/Graphics";


export const Restaurant = ({ restaurants }) => {
    const [current, setCurrent] = useState(null);
    const { id } = useParams();


    console.log (restaurants);
    console.log (id);


    
    useEffect(() => {
        setCurrent(restaurants.filter((e) => e.id === id)[0]);
        console.log('1')
    }, [id])



    // const info = useLocation();
    // const {
    //     name,
    //     description,
    //     phoneNumber,
    //     openingTime,
    //     closingTime,
    //     location,
    //     cuisine,
    //     price,
    //     diningRestriction,
    //     tables,
    // } = info.state;


    return (
        <>
            {current && (
                <Card  id={current.id}>
                    <Card.Img
                        variant="top"
                        src={
                            graphics[
                                Math.floor(Math.random() * graphics.length)
                            ]
                        }
                    />
                    <Card.Body>
                        <Card.Title>{current.name}</Card.Title>
                        <Card.Text className="cardText">{
                            current.description}</Card.Text>
                    </Card.Body>

                    <Row className="border">
                        <Col>
                            <Card.Text className="cardText">{current.price}</Card.Text>
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
                    <Card.Body></Card.Body>
                </Card>
            )}
        </>
    );

    // return (
    //     <>
    //         <div className="restaurantInfo">
    //             <p>{name}</p>
    //             <p>{description}</p>
    //             <p>{phoneNumber}</p>
    //             <p>{openingTime}</p>
    //             <p>{closingTime}</p>
    //             <p>{location}</p>
    //             <p>{cuisine}</p>
    //             <p>{price}</p>
    //             <p>{diningRestriction}</p>
    //             <p>Tables</p>
    //         </div>
    //     </>
    // );
};
