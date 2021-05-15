# BookStore


## Tech

BookStore uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [MongoDB] - for Database


## Installation

requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and start the app.

```sh
cd bookstore
npm install
npm start
```


## Server Side Project Structure

- ./config includes configuration files (DB Connection String)
- ./controllers contains RESTful Web Service controller files
- ./routers contains Web Service Routes
- ./Middleware contains middleware coffee existence check
-  ./models foldercontains serverside models files
-  ./index.js start file for server running

## API URLs
```sh
- POST http://localhost:1905/api/manager/tenant (create dynamic tenant, params {"name": "xxx"})
- GET http://localhost:1905/api/manager/tenant (get all tenants)
- POST http://localhost:1905/api/tenant/book/addBook (create book with tenant, 
  params {
    "name": "xxx",
    "author": "xxx",
    "pressYear": "2020"
} and 
header param tenant=xxx)
- GET http://localhost:1905/api/tenant/book/addBook (get all book with tenant,header param tenant=xxx)
- POST http://localhost:1905/api/tenant/bookStore/addBookStore (create book store with tenant, 
  params {
    "name": "xxx store",
    "addresses": "xxxxxxx  xxx  xxxx xxxx",
    "books": [
        "609...." //book id
    ]
} and 
header param tenant=xxx)
GET http://localhost:1905/api/tenant/bookStore/ (get all book store with tenant,header param tenant=xxx)
```