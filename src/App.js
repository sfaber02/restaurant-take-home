import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";

/**
 * bootstrap import and image import
 */
import "bootstrap/dist/css/bootstrap.min.css";
import smallGraphics from "./assets/Graphics/Small/smallGraphics";

/**
 * Compnonent imports for Routes
 */
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { Restaurants } from "./components/Restaurants";
import { Restaurant } from "./components/restaurant subcomponents/Restaurant";
import { NewRestaurant } from "./components/NewRestaurant";
import { Error } from "./components/Error";

const API = process.env.REACT_APP_API_URL;

export const App = () => {
    /** States to store all restaurants from initial data fetch */
    const [restaurants, setRestaurants] = useState(() => "");

    /** State to display loading animation until intial fetch is complete */
    const [loading, setLoading] = useState(() => true);
    /** State to store user input from search bar */
    const [query, setQuery] = useState("");
    /** state that will trigger a refetch when changed  */
    const [reFetch, setReFetch] = useState(-1);

    const navigate = useNavigate();

    /**
     * Initial fetch done on page load, fetches all restaurant info from backend
     * and assigns a static graphic to each restaurant
     * then sets loading state to false and restaurant state to fetched data
     */
    useEffect(() => {
        axios
            .get(`${API}/restaurants`)
            .then((response) => {
                let tempData = response.data.restaurants;
                let index = 0;
                for (let restaurant of tempData) {
                    if (index >= smallGraphics.length - 1) index = 0;
                    restaurant.graphic = smallGraphics[index];
                    index++;
                }
                setRestaurants(tempData);
                setLoading(false);
            })
            .catch((err) => navigate("/error"));
    }, [navigate, reFetch]);

    const handleSearch = (query) => {
        setQuery(query);
    };

    const triggerRefetch = () => {
        setReFetch(p => -p);
    }

    /**
     * Renders loading animation if fetch is still happening
     * otherwise renders navbar and home route until user navigates
     * to a different route
     */
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
                    <Navigation handleSearch={handleSearch} />
                    <Routes>
                        <Route
                            path="/"
                            element={<Home restaurants={restaurants} />}
                        />
                        <Route
                            path="restaurants"
                            element={
                                <Restaurants
                                    restaurants={restaurants}
                                    query={query}
                                />
                            }
                        >
                            <Route
                                path=":id"
                                element={
                                    <Restaurant restaurants={restaurants} triggerRefetch={triggerRefetch} />
                                }
                            />
                        </Route>
                        <Route
                            path="/newRestaurant"
                            element={
                                <NewRestaurant
                                    restaurants={restaurants}
                                    triggerRefetch={triggerRefetch}
                                />
                            }
                        >
                            <Route
                                path=":id"
                                element={
                                    <NewRestaurant
                                        restaurants={restaurants}
                                        triggerRefetch={triggerRefetch}
                                    />
                                }
                            ></Route>
                        </Route>

                        {/* <Route
                            path="/newReservation"
                            element={<NewReservation />}
                        /> */}
                        {/* <Route path="/reservations" element={<Reservations />}>
                            <Route path=":id" element={<Reservation />} />
                        </Route> */}
                        <Route path="/error/:err" element={<Error />} />
                        <Route path="/error" element={<Error />} />
                    </Routes>
                </main>
            )}
        </>
    );
};
