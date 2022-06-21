import React from "react";

import { Carousel, Container } from "react-bootstrap";

import bigGraphics from "../assets/Graphics/Big/bigGraphics.js";

import "../styles/home.css";

/**
 * LANDING PAGE
 * @param {array} an array of restaurants
 * @returns a carousel view of random restaurants
 */
export const Home = ({ restaurants }) => {
    console.log(bigGraphics);
    return (
        <Container className="border border-warning mw-100 p-5">
            <Carousel fade >
                {restaurants.map(e => {
                    return (
                        <Carousel.Item className="border border-danger">
                            <img
                                style={{
                                    maxHeight: "100vh",
                                    objectFit: "cover",
                                }}
                                className="d-block w-100 carouselImg border border-success"
                                src={
                                    bigGraphics[
                                        Math.floor(
                                            Math.random() * bigGraphics.length
                                        )
                                    ]
                                }
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h3>Butt slide label</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </Container>
    );
};
