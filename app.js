const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();
app.use(express.json());

/**
 * Use Routes:
 *   product route
 *   user route
 */
app.use("/api/v1", require("./routes/productRoute.js"));
app.use("/api/v1", require("./routes/userRoute.js"));

/**
 * use error middleware
 */
app.use(errorMiddleware);

module.exports = app;
