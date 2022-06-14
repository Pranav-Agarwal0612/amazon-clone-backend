const app = require("./app.js");

/**
 * config
 */
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

/**
 * connect to database
 */
const connectDatabase = require("./config/database.js");
connectDatabase();

app.listen(process.env.PORT, () => {
	console.log(`server started on port ${process.env.PORT}`);
});
