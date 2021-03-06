import React from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Container } from "react-bootstrap";

import bigGraphics from "../assets/Graphics/Big/bigGraphics.js";
import "../styles/home.css";

/**
 * LANDING PAGE - a carousel view of restaurants, clicking on a carousel entry will
 * navigate user to that restaurants page
 * @param {array} restaurants an array of restaurants
 * @returns a carousel view of random restaurants
 */
export const Home = ({ restaurants }) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/restaurants/${id}`);
    };

    return (
        <Container className="m-0 p-0">
            <Carousel fade className="carousel">
                {restaurants.map((e) => {
                    return (
                        <Carousel.Item
                            key={e.id}
                            id={e.id}
                            onClick={() => {
                                handleClick(e.id);
                            }}
                        >
                            <img
                            className="carouselImg"
                                src={
                                    bigGraphics[
                                        Math.floor(
                                            Math.random() * bigGraphics.length
                                        )
                                    ]
                                }
                                alt="Second slide"
                            />
                            <Carousel.Caption className="carouselCaption">
                                <h3>{e.name}</h3>
                                <p className="p-2">{e.description.split(".")[0] + "."}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </Container>
    );
};
