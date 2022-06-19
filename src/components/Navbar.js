import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/navbar.css";

export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navBarContainer">
            <div>Restaurantly</div>
            <div onClick={() => navigate("/restaurants")}>Restaurants</div>
            <div onClick={() => navigate("/reservations")}>Reservations</div>
            <div onClick={() => navigate('/newRestaurant')}>New Restaurant</div>
            <div>Sign Up</div>
        </div>
    );
};
