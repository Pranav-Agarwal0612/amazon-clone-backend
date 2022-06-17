const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter your name"],
	},
	email: {
		type: String,
		required: [true, "Please enter your Email ID"],
		unique: true,
		validate: [validator.isEmail, "Please enter valid Email"],
	},
	password: {
		type: String,
		required: [true, "Please Enter your password"],
		minlength: [8, "Password should have atleast 8 characters"],
		select: false,
	},
	role: {
		type: String,
		default: "user",
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},

	resetPasswordToken: String,
	resetPasswordExpiry: Date,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

userSchema.methods.comparePassword = function (password) {
    
}

module.exports = mongoose.model("User", userSchema);
