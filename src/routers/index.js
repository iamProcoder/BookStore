const express = require("express");
const routes = require("./routers");

const router = app => {
  app.get("/", (req, res, next) => {
    res.json({ body: "multi tenancy application..." });
  });

  const apiRoutes = express.Router();
  apiRoutes.use("/", routes);

  apiRoutes.use((req, res, next) => {
    if (!req.route) {
      const error = new Error("No route matched");
      error.status = 404;
      return next(error);
    }

    next();
  });

  app.use("/api", apiRoutes);
};
module.exports = router;