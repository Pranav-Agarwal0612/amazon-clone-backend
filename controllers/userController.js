const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

exports.registerUser = catchAsyncError(async (req, res, next) => {
	const { name, email, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: "temp placeholder",
			url: "temp placeholder",
		},
	});

	const token = user.getJWTToken();

	res.status(201).json({
		success: true,
		token,
	});
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHandler("Please enter Email & Password", 400));
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new ErrorHandler("Invalid Email & Password"), 401);
	}

	const isPasswordMatched = user.comparePassword();
	if (!isPasswordMatched) {
		return next(new ErrorHandler("Invalid Email & Password"), 401);
	}
});
