import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import { RestaurantCard } from "./restaurant subcomponents/RestaurantCard";

const API = process.env.REACT_APP_API_URL;

export const Restaurants = () => {
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
            .catch((err) => console.log(err));
    }, []);

   

    return (
        <div>
            {!loading && restaurants.map((e) => 
            <RestaurantCard 
                key={e.id}
                info={e}
            />)}
            <Outlet />
        </div>
    );
};


