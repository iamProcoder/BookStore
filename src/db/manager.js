const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology:true
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open");
});

mongoose.connection.on("error", err => {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

const initManagerDbConnection = DB_URL => {
  try {
    const db = mongoose.createConnection(DB_URL, clientOption);

    db.on(
      "error",
      console.error.bind(
        console,
        "initManagerDbConnection MongoDB Connection Error => "
      )
    );
    db.once("open", () => {
      console.log("initManagerDbConnection client MongoDB Connection OK");
    });

    require("../models/tenant/schema");
    return db;
  } catch (error) {
    console.log("initManagerDbConnection error", error);
  }
};

module.exports = {
  initManagerDbConnection
};