import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const Restaurants = () => {
    const [places, setPlaces] = useState(() => "");
    const [loading, setLoading] = useState(() => true);

    useEffect(() => {
        axios
            .get(`${API}/restaurants`)
            .then((response) => {
                console.log(response.data.restaurants);
                setPlaces(response.data.restaurants);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <div>
            {!loading && places.map((e) => {
                return (
                    <>
                        {e.name}
                        <br />
                    </>
                )    
            })}
            <Outlet />
        </div>
    );
};

export { Restaurants };
