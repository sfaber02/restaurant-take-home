import React from "react";

import { Link } from "react-router-dom";
import "../../styles/restaurantCard.css"

export const RestaurantCard = ({ info }) => {
    const { id, name, description } = info;

    return (
        <div className="restaurantCard">
            <p>{id}</p>
            <p>{name}</p>
            <p>{description}</p>
            <Link to={`${id}`} state={info}>More Info</Link>
            <hr />
        </div>
    );
};