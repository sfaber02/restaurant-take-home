import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";

import "../../styles/restaurant.css"


export const Restaurant = () => {
    const { id } = useParams();
    const info = useLocation();
    const {
        name,
        description,
        phoneNumber,
        openingTime,
        closingTime,
        location,
        cuisine,
        price,
        diningRestriction,
        tables,
    } = info.state;

    return (
        <>
            <div className="restaurantInfo">
                <p>{name}</p>
                <p>{description}</p>
                <p>{phoneNumber}</p>
                <p>{openingTime}</p>
                <p>{closingTime}</p>
                <p>{location}</p>
                <p>{cuisine}</p>
                <p>{price}</p>
                <p>{diningRestriction}</p>
                <p>Tables</p>
            </div>
        </>
    );
};
