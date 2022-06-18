import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const Restaurants = () => {
    const [restaurants, setRestaurants] = useState(() => "");
    const [loading, setLoading] = useState(() => true);

    useEffect(() => {
        axios
            .get(`${API}/restaurants`)
            .then((response) => {
                console.log(response.data.restaurants);
                setRestaurants(response.data.restaurants);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

   

    return (
        <div>
            {!loading && restaurants.map((e) => {
                return (
                    <div id={e.name}>
                        {e.name}
                    </div>
                )    
            })}
            <Outlet />
        </div>
    );
};


