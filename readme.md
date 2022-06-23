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


### TODO
- all reservation stuff
- fix search
- center loading animation
- fix carousel giant image explosion
- build out restaurant card with links for delete, edit, reservation, etc
- add functionality so page reloads when restaurants/reservations are added / deleted
- add redirect file
- fix filtering so options don't disappear
- new reservation form validation
- add tables info somewhere
- add validation for reservation time reservations cannot be made outside of open hours
- add validation for reservations so reservation can't be made if no tables are open
- refactor hours formmater into helper function


```
