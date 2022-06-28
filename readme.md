# RESTAURANTICUS


## Component Structure


## Restaurants
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
- delete reservation
- fix search
- fix carousel giant image explosion
- add redirect file
- fix filtering so options don't disappear
- add tables info somewhere
- add validation for reservation time reservations cannot be made outside of open hours
- add validation for reservations so reservation can't be made if no tables are open
- refactor hours formmater into helper function
- limit time inputs to 15 min intervals
- add icons and titles to pages
- add a "none" option to dining restrictions
- add info section to readme
- 


### BUGS
- updating is not working because of date/time iso timestamp format something or other!! ARGH
- time function is converting times to UTC not local time
- phone number validation is no longer matching what is required by backend
- filter selections don't reset when reset button is clicked
- edit reservation form stays populated if you click edit but don't edit a reservation and back to the all reservations view then back to make a reservation.
