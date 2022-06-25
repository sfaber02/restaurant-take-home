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

Restaurant Data Structur for New Restaurant Form Object
```
{
     name:
     cuisine
     description:
     price:
     location:
     openingTime
     closingTime
     phoneNumber
     diningRestrictons
     twoPerson
     fourPerson
     eightPerson
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
- all reservation stuff
- fix search
- center loading animation
- fix carousel giant image explosion
- add redirect file
- fix filtering so options don't disappear
- new reservation form validation
- add tables info somewhere
- add validation for reservation time reservations cannot be made outside of open hours
- add validation for reservations so reservation can't be made if no tables are open
- refactor hours formmater into helper function
- limit time inputs to 15 min intervals

### BUGS
- add validation for blank email in new reservation
- updating is not working because of date/time iso timestamp format something or other!! ARGH
- time function is converting times to UTC not local time
- phone number validation is no longer matching what is required by backend
- 
