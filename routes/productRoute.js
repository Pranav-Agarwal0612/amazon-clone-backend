const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const router = express.Router();

/**
 * GET ALL PRODUCTS
 */
router.route("/products").get(getAllProducts);

/**
 * CREATE NEW PRODUCT --ADMIN
 */
router.route("/product/new").post(createProduct);

/**
 * UPDATE PRODUCT --ADMIN
 * DELETE PRODUCT --ADMIN
 * GET SINGLE PRODUCT DETAILS
 */
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router;
