# ** REST API DELILAH RESTO**

**A REST API for managing orders, products and users.**
**Originally designed for restaurants, but you can use it however you want. Go nuts!**

This is an API where you can allow users to register and login, upload products and manage orders.

This README.md will guide you on how to install and use this application.

NOTE: You can also find the documentation as a swagger file in https://app.swaggerhub.com/apis/daninkc/delilahresto/1.0.0

## Getting Started

## Choose a folder and clone the repository

$ git clone https://github.com/daninkc/delilah.git

or download the ZIP from Github

## To install the dependencies

Use *npm install* and install all the dependencies needed.

## Dependencies used

````json
"dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "express-validator": "^6.5.0",
    "jwt-simple": "^0.5.6",
    "moment": "^2.26.0",
    "mysql2": "^2.1.0",
    "sequelize": "^5.21.12"
}
````

## Configure the database

This starts the database with a name and a key included. You can choose your own if necessary.

````js
const sequelize = new Sequelize(
    'ei1GBJjAJJ',
    'ei1GBJjAJJ',
    '5vHkoxbnfe',
{
    host: 'remotemysql.com',
    dialect: 'mysql'
});
````
Databases will generate automatically after initializing server.

## Initialize the server

You should have XAMPP and start Apache and MySQL.

With Node - *node index.js*

With Nodemon - *nodemon index.js*

By default, this will install the app in port 3000 of the localhost (computer).

http://localhost:3000/

## Checking if it's running correctly

Write http://localhost:3000/ in a browser.

You should get a message: "Oh, you're here! What a pleasant surprise"

## Testing the API

Use Postman or similar apps to try out the different GET, POST, PUT and DELETE requests.

## Middlewares

There are two main middlewares that set permissions for different types of users.
Users can be Admin or General user.

*checkToken*: Whenever a user registers and then logs in, you will get a Token called user_token.
Methods are checked to verify the token isn't modified along the way.

*checkAdminStatus*: Here, we can see if the user is an administrator or not, so we can allow or deny access.
To register an user as administrator, in the body of the POST request, you should add key "adminStatus" and, for that key, value "22081920"
(Ray Bradbury's birth date)


## METHODS

You can verify how the methods work in this Postman collection: https://www.getpostman.com/collections/e97fa9d611c1d04628da

Or... you can just use this.

Important note: middlewares check user and admin with a token. To have access to resources with admin privileges, you need to be logged in as a registered admin first.

Other important note: Please remember to use JSON for all "body: raw" requests.

## For managing users

POST - Register a user

http://localhost:3000/users/register

Request body:

````js
    {
        "username": "my_username",
        "password": "mypassword",
        "name_lastName": "My Name and Last Name",
        "email": "myemail@email.com",
        "phone_number": "1234567890",
        "address": "My address",
        "adminStatus": 22081920
    }
````

(adminStatus is an optional parameter. This number makes for admin privileges)

POST - Login of user

http://localhost:3000/users/login

````js
    {
        "username": "my_username",
        "password": "mypassword",
        "email": "myemail@email.com"
    }
````

GET - See all users

http://localhost:3000/users/

*You need admin privileges via checkAdminStatus middleware*

GET - See one user by ID

http://localhost:3000/users/:userID

*You need admin privileges via checkAdminStatus middleware*

PUT - Edit a user

http://localhost:3000/users/:userID

*You need admin privileges via checkAdminStatus middleware*

````js
    {
        "username": "new_username",
        "password": "newpassword",
        "name_lastName": "New Name or Last Name",
        "email": "newemail@email.com",
        "phone_number": "01234567",
        "address": "New address",
    }
````

DELETE - Remove a user

http://localhost:3000/users/:userID

*You need admin privileges via checkAdminStatus middleware*

## For managing products

GET - See all products

http://localhost:3000/products/

*You need user privileges via checkToken middleware*

GET - See one product

http://localhost:3000/products/:productID

*You need user privileges via checkToken middleware*

POST - Generate a product

http://localhost:3000/products/

*You need admin privileges via checkAdminStatus middleware*

````js
{
    "price": 100,
    "name": "hamburguer"
}
````

PUT - Edit a product

http://localhost:3000/products/:productID

*You need admin privileges via checkAdminStatus middleware*

````js
{
    "price": 400,
    "name": "hamburguer"
}
````

DELETE - Remove a product

http://localhost:3000/products/:productID

*You need admin privileges via checkAdminStatus middleware*

## For managing orders

GET - See all orders

http://localhost:3000/orders/

*You need admin privileges via checkAdminStatus middleware*

GET - See one order

http://localhost:3000/orders/:orderID

*You need admin privileges via checkAdminStatus middleware*

POST - Generate an order

http://localhost:3000/orders/

*You need user privileges via checkToken middleware*

````js
{
    "description": "Pedido",
    "total_price": 50.50,
    "order_items":[{
        "productfk": 1,
        "quantity": 2,
        "price": 425
    },{
        "productfk": 2,
        "quantity": 1,
        "price": 500
}]
}
````

PUT - Edit an order

http://localhost:3000/orders/:orderID

*You need admin privileges via checkAdminStatus middleware*

````js
{
    "description": "Pedido modificado",
    "total_price": 100.00,
    "status": "Cancelado",
    "order_items":[{
        "productfk": 1,
        "quantity": 3,
        "price": 500
    },{
        "productfk": 2,
        "quantity": 2,
        "price": 200
}]
}
````

DELETE - Remove an order

http://localhost:3000/orders/:orderID

*You need admin privileges via checkAdminStatus middleware*
