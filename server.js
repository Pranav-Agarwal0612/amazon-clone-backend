const app = require("./app.js");

/**
 * config
 */
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// exiting due to uncaught expections
process.on("uncaughtException", (err) => {
	console.log("Error : " + err.message);
	console.log("Shutting down server due to Uncaught Exception");

	process.exit(1);
});

/**
 * connect to database
 */
const connectDatabase = require("./config/database.js");
connectDatabase();

const server = app.listen(process.env.PORT, () => {
	console.log(`server started on port ${process.env.PORT}`);
});

// exiting due to unhandled rejections
process.on("unhandledRejection", (err) => {
	console.log(`Error : ${err.message}`);
	console.log("Shutting down server due to Unhandled Rejection");

	server.close(() => {
		process.exit(1);
	});
});
