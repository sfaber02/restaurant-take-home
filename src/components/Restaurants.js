import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

import { RestaurantCard } from "./restaurant subcomponents/RestaurantCard";

const API = process.env.REACT_APP_API_URL;

export const Restaurants = () => {
    const [restaurants, setRestaurants] = useState(() => "");
    const [loading, setLoading] = useState(() => true);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        navigate('/restaurants');
    };

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
            {!loading &&
                restaurants.map((e) => (
                    <RestaurantCard
                        key={e.id}
                        info={e}
                        handleShow={handleShow}
                        handleClose={handleClose}
                    />
                ))}
            <Modal show={show} onHide={handleClose}>
                <Outlet />
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal>
        </div>
    );
};


