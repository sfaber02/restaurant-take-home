# RESTAURANTICUS


## Component Structure


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
- refactor hours formmater into helper function
- add info section to readme
- finish documentation
- generate jsdoc
- style info div on home page
- fix buttons on reservation tab in mobile view

### BUGS
- edit reservation form stays populated if you click edit but don't edit a reservation and then go back to the all reservations view then back to make a reservation.


### Future Features
- add tables info somewhere
- add validation for reservation time reservations cannot be made outside of open hours
- add validation for reservations so reservation can't be made if no tables are open
- limit time inputs to 15 min intervals
