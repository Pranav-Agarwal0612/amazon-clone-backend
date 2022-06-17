const mongoose = require("mongoose");
const ErrorHandler = require("../utils/errorhandler");

const connectDatabase = () => {
	mongoose
		.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((data) => {
			console.log(`MongoDB connnect with server : ${data.connection.host}`);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = connectDatabase;
