const express = require("express");
const Routes = express.Router();
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const { verifyTokenAdmin } = require("../middleware");

const admin = require("../controllers/admin");
const product = require("../controllers/product");

// Auth
Routes.post("/login", admin.adminLogin);

// Product
Routes.get('/products', product.getAll)
Routes.get('/products/:id', product.getSingle)
Routes.post('/products', product.addNew)
Routes.patch('/products/:id', product.update)
Routes.delete('/products/:id', product.remove)
Routes.post('/import', verifyTokenAdmin, multipartMiddleware, product.importData)

module.exports = Routes;