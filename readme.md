# RESTAURANTICUS
Restauranticus is an app that displays a filterable and searchable list of restaurants and information about them.  It also allows the user to create / edit reservations for a restaurant.

## Component Structure
- App
    - Navigation
    - Restaurants
        - FilterBar
        - RestaurantCard
        - Restaurant
            - ReservationTab
                - ReservationCard
                - NewReservation
    - NewRestaurant
    - Error

## Data Structures
Example Resaurant Data for backend

```
{
    "id": "d8012e0f-2c1d-4873-b99e-5ef1607ddc0c",
    "name": "Roberta's Pizza",
    "description": "French restaurant with beautfiul desserts in a cozy setting. This restaurant's french cuisine brings Paris right to your city.",
    "phoneNumber": "4447620042",
    "openingTime": "10:00:00",
    "closingTime": "22:00:00",
    "location": "New York City",
    "cuisine": "Pizza",
    "price": "$$",
    "diningRestriction": null,
    "tables": {
        "twoPersonTables": 5,
        "fourPersonTables": 5,
        "eightPersonTables": 5
    },
    "reservations": [
        null
    ]
}
```
Example Reservation Date for backend
```
{
    "id": "71c2f6ca-6642-4c44-be41-2c4dbf0b679c",
    "createdAt": "2022-06-28T04:55:42.795Z",
    "firstName": "Georgie ",
    "lastName": "Boi",
    "phoneNumber": "1234567890",
    "email": "shawn@gmail.com",
    "time": "2022-07-08T13:00:00.000Z",
    "numGuests": 2,
    "restaurantId": "b7b87b25-2a2a-488a-a80e-5bb8b7c9532b"
}
```

Restaurant Data Structure for New Restaurant Form Object
```
{
     name: string
     cuisine: string
     description: string
     price: $ || $$ || $$$ || $$$$
     location: string
     openingTime: ???
     closingTime: ???
     phoneNumber: ???
     diningRestrictons: string -> Takeout Only || Delivery Only
     twoPerson: int
     fourPerson: int
     eightPerson: int
}
```

Reservation Data Structure for new reservation Form Object
```
{
    firstName,
    lastName,
    phoneNumber,
    email,
    time,
    date,
    numGuests
}
```

### TODO
- finish documentation
- generate jsdoc

### BUGS
- 

### Future Features
- add tables info somewhere
- add validation for reservation time reservations cannot be made outside of open hours
- add validation for reservations so reservation can't be made if no tables are open
- limit time inputs to 15 min intervals



