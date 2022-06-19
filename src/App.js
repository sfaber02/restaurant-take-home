import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { Restaurants } from "./components/Restaurants";
import { Restaurant } from "./components/restaurant subcomponents/Restaurant";
import { NewRestaurant } from "./components/NewRestaurant";
import { NewReservation } from "./components/NewReservation";
import { Reservations } from "./components/Reservations";
import { Reservation } from "./components/Reservation";
import { Error } from "./components/Error";

const API = process.env.REACT_APP_API_URL;

export const App = () => {
    const [restaurants, setRestaurants] = useState(() => "");
    const [loading, setLoading] = useState(() => true);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${API}/restaurants`)
            .then((response) => {
                setRestaurants(response.data.restaurants);
                setLoading(false);
            })
            .catch((err) => navigate("/error"));
    }, []);

    return (
        <>
            {loading ? (
                <Container className="d-flex justify-content-center">
                    <Spinner animation="grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <Spinner animation="grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <Spinner animation="grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <Spinner animation="grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>
            ) : (
                <main>
                    <Navigation />
                    <Routes>
                        <Route
                            path="/"
                            element={<Home restaurants={restaurants} />}
                        />
                        <Route
                            path="restaurants"
                            element={<Restaurants restaurants={restaurants} />}
                        >
                            <Route
                                path=":id"
                                element={
                                    <Restaurant restaurants={restaurants} />
                                }
                            />
                        </Route>
                        <Route
                            path="/newRestaurant"
                            element={<NewRestaurant />}
                        />
                        <Route
                            path="/newReservation"
                            element={<NewReservation />}
                        />
                        <Route path="/reservations" element={<Reservations />}>
                            <Route path=":id" element={<Reservation />} />
                        </Route>
                        <Route path="/error/:err" element={<Error />} />
                        <Route path="/error" element={<Error />} />
                    </Routes>
                </main>
            )}
        </>
    );
};
