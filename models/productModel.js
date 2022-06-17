const mongoose = require("mongoose");

productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Enter Product Name"],
	},
	price: {
		type: Number,
		required: [true, "Please Enter Product Price"],
		maxlength: [8],
	},
	description: {
		type: String,
		required: [true, "Please Enter Product Description"],
	},
	rating: {
		type: Number,
		default: 0,
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, "Please Enter Product Category"],
	},
	stock: {
		type: Number,
		default: 1,
		required: [true, "Please Enter Product Quantity"],
		maxlength: [4],
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			name: {
				type: String,
				required: true,
			},
			comment: {
				type: String,
				requied: true,
			},
			rating: {
				type: Number,
				required: true,
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Product", productSchema);
