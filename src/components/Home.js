import React from "react";

import { Carousel } from "react-bootstrap";
import graphics from '../assets/Graphics/Graphics.js';

import "../styles/home.css"

export const Home = ({ restaurants }) => {



    return (
        <Carousel fade>
            <Carousel.Item>
                <img
                    className="d-block w-100 carouselImg"
                    src={graphics[Math.floor(Math.random() * graphics.length)]}
                    alt="First slide"
                />
                <Carousel.Caption className="carouselCaption">
                    <h3>First slide label</h3>
                    <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carouselImg"
                    src={graphics[Math.floor(Math.random() * graphics.length)]}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carouselImg"
                    src={graphics[Math.floor(Math.random() * graphics.length)]}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};
