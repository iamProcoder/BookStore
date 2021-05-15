const express = require("express");
const path = require("path");
const router = require('./routers')

const { connectAllDb } = require("./helper/connectionManager");

const app = express();
const PORT = 1905
app.set("port", PORT);

const cors = require("cors");
app.use(cors());

app.use(express.json());

connectAllDb();

// global.appRoot = path.resolve(__dirname);

router(app);

app.listen(PORT, () => { console.log(`Express server started at port: ${PORT}`); });