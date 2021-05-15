const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 1,
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
  console.log("Mongoose default connection error => " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

const initTenantDbConnection  = DB_URL => {
  try {
    const db = mongoose.createConnection(DB_URL, clientOption);

    db.on(
      "error",
      console.error.bind(
        console,
        "initTenantDbConnection  MongoDB Connection Error => "
      )
    );
    db.once("open", () => {
      console.log("initTenantDbConnection  client MongoDB Connection OK");
    });

    require("../models/book_store/book.model");
    require("../models/book_store/bookStore.model");
    return db;
  } catch (error) {
    console.log("initTenantDbConnection  error ", error);
  }
};

module.exports = {
  initTenantDbConnection 
};