import React from "react";
import { Routes, Route } from "react-router-dom";



import { Navbar } from "./components/Navbar";
import { Restaurants } from "./components/Restaurants";
import { Restaurant } from "./components/restaurant subcomponents/Restaurant";
import { NewRestaurant } from "./components/NewRestaurant";
import { NewReservation } from "./components/NewReservation";
import { Reservations } from "./components/Reservations";
import { Reservation } from "./components/Reservation";
import { Error } from "./components/Error";

export const App = () => {
    const Home = () => {
        return <h1>HI</h1>;
    };

    return (
        <main>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="restaurants" element={<Restaurants />}>
                    <Route path=":id" element={<Restaurant />} />
                </Route>
                <Route path="/newRestaurant" element={<NewRestaurant />} />
                <Route path="/newReservation" element={<NewReservation />} />
                <Route path="/reservations" element={<Reservations />}>
                    <Route path=":id" element={<Reservation />} />
                </Route>
                <Route path="/error/:err" element={<Error />} />
                <Route path="/error" element={<Error />} />
            </Routes>
        </main>
    );
};

