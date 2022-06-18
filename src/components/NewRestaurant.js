import React from 'react'

export const NewRestaurant = () => {
  return (
    <form>
        <label for="name">Name: </label>
        <input name="name" type="text" />
        <label for="description">Description: </label>
        <input name="description" type="text" />
        <label for="phoneNumber">Phone Number: </label>
        <input name="phoneNumber" type="text" />
        <label for="openingTime">Opening Time: </label>
        <input name="openingTime" type="text" />
        <label for="closingTime">Closing Time: </label>
        <input name="closingTime" type="text" />
        <label for="price">Price: </label>
        <input name="price" type="text" />
        <label for="cuisine">Cuisine: </label>
        <input name="cuisine" type="text" />
        <label for="location">Location: </label>
        <input name="location" type="text" />
        <label for="diningRestriction">Dining Restriction: </label>
        <input name="diningRestriction" type="text" />
    </form>
  )
}
