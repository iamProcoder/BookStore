const express = require("express");

const connectionResolver = require("../middleware/connectionResolver");
const route = express.Router();

route.use("/tenant", connectionResolver.resolveTenant);
route.use("/manager", connectionResolver.setManagerDb);

// manager
const managerApi = require("../controllers/managerController");
route.post("/manager/tenant", managerApi.create);
route.get("/manager/tenant", managerApi.fetchAll);

// book
const bookApi = require("../controllers/bookController");
route.post("/tenant/book/addBook", bookApi.addBook);
route.get("/tenant/book", bookApi.fetchAll);

// book store
const bookStoreApi = require("../controllers/bookStoreController");
route.post("/tenant/bookStore/addBookStore", bookStoreApi.addBookStore);
route.get("/tenant/bookStore", bookStoreApi.fetchAll);

module.exports = route;