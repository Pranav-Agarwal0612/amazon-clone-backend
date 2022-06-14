const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();
app.use(express.json());

/**
 * use product routes
 */
app.use("/api/v1", require("./routes/productRoute.js"));

/**
 * use error middleware
 */
app.use(errorMiddleware);

module.exports = app;
