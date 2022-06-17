const productModel = require("../models/productModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

/**
 *  CREATE PRODUCT --ADMIN
 */
const createProduct = catchAsyncError(async (req, res, next) => {
	await Product.create(req.body).then((product) => {
		res.status(201).json({
			success: true,
			product,
		});
	});
});

/**
 *  GET ALL PRODUCTS
 */
const getAllProducts = catchAsyncError(async (req, res) => {
	const resultsPerPage = 5;
	const apifeature = new ApiFeatures(Product, req.query).search().filter().pagination(resultsPerPage);

	const products = await apifeature.query;

	res.status(200).json({
		success: true,
		products,
	});
});

/**
 *  UPDATE PRODUCT --ADMIN
 */
const updateProduct = catchAsyncError(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		next(new ErrorHandler("Product not Found", 404));
	} else {
		product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			success: true,
			product,
		});
	}
});

/**
 * DELETE PRODUCT --ADMIN
 */
const deleteProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		next(new ErrorHandler("Product not Found", 404));
	} else {
		product.delete();

		res.status(200).json({
			success: true,
			message: "Product deleted Successfully",
		});
	}
});

/**
 * GET SINGLE PRODUCT DETAILS
 */
const getProductDetails = catchAsyncError(async (req, res, next) => {
	await Product.findById(req.params.id).then((product) => {
		if (!product) {
			next(new ErrorHandler("Product not Found", 404));
		}
		res.status(200).json({
			success: true,
			product,
		});
	});
});

module.exports = {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductDetails,
	updateProduct,
};
