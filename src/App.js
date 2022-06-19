import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

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

    useEffect(() => {
        axios
            .get(`${API}/restaurants`)
            .then((response) => {
                setRestaurants(response.data.restaurants);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <main>
            <Navigation />
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
