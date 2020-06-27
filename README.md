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
    "express": "^4.17.1",
    "express-validator": "^6.6.0",
    "jsonwebtoken": "^8.5.1",
    "jwt-simple": "^0.5.6",
    "moment": "^2.27.0",
    "mysql2": "^2.1.0",
    "node": "^14.4.0",
    "sequelize": "^5.21.13"
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

If it's easier, you can see all the methods in a very beautiful and interactive Swagger documentation!
https://app.swaggerhub.com/apis/daninkc/delilahresto/1.0.0

Or... you can just use this.

Important note: middlewares check user and admin with a token. To have access to resources with admin privileges, you need to be logged in as a registered admin first.

## For managing users

POST - Register a user

http://localhost:3000/users/register

*For the body of the request, you will need: username (string), password (string), name_Lastname (string), phone_number (string), email (string)*

(adminStatus is an optional parameter)

POST - Login of user

http://localhost:3000/users/login

*For the body of the request, you will need: username (string), password (string), email (string)*

GET - See all users

http://localhost:3000/users/

*You need admin privileges via checkAdminStatus middleware*

GET - See one user by ID

http://localhost:3000/users/:userID

*You need admin privileges via checkAdminStatus middleware*

PUT - Edit a user

http://localhost:3000/users/:userID

*You need admin privileges via checkAdminStatus middleware*

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
*For the body of the request, you will need: name (string), price (double)*

PUT - Edit a product

http://localhost:3000/products/:productID

*You need admin privileges via checkAdminStatus middleware*

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
*For the body of the request, you will need: total_price (double), payment_method (string)*

PUT - Edit an order

http://localhost:3000/orders/:orderID

*You need admin privileges via checkAdminStatus middleware*

DELETE - Remove an order

http://localhost:3000/orders/:orderID

*You need admin privileges via checkAdminStatus middleware*
