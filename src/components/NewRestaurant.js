import React from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

/**
 * component to add a new restaurant
 * @returns a form to add a new restaurant to DB
 */
export const NewRestaurant = () => {

    /** handles form submit */
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.name.value);
        const body = JSON.stringify({
            name: e.target.name.value,
            description: e.target.description.value,
            phoneNumber: e.target.phoneNumber.value,
            openingTime: e.target.openingTime.value,
            closingTime: e.target.closingTime.value,
            price: e.target.price.value,
            cuisine: e.target.cuisine.value,
            location: e.target.location.value,
            diningRestriction: e.target.diningRestriction.value,
        });

        const config = {
            method: "post",
            url: `${API}/restaurants`,
            headers: {
                "Content-Type": "application/json",
            },
            data: body,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input name="name" type="text" />
            <label htmlFor="description">Description: </label>
            <input name="description" type="text" />
            <label htmlFor="phoneNumber">Phone Number: </label>
            <input name="phoneNumber" type="text" />
            <label htmlFor="openingTime">Opening Time: </label>
            <input name="openingTime" type="text" />
            <label htmlFor="closingTime">Closing Time: </label>
            <input name="closingTime" type="text" />
            <label htmlFor="price">Price: </label>
            <input name="price" type="text" />
            <label htmlFor="cuisine">Cuisine: </label>
            <input name="cuisine" type="text" />
            <label htmlFor="location">Location: </label>
            <input name="location" type="text" />
            <label htmlFor="diningRestriction">Dining Restriction: </label>
            <input name="diningRestriction" type="text" />
            <input type="submit" />
        </form>
    );
};
