import React from "react";

export const ReservationCard = ({ info }) => {
    const {
        id,
        createdAt,
        firstName,
        lastName,
        phoneNumber,
        email,
        time,
        numGuests,
        restaurantId,
    } = info;

    return (
        <div className="reservationCard">
            <p>{createdAt}</p>
            <p>{firstName}</p>
            <p>{lastName}</p>
            <hr />
        </div>
    )
};
