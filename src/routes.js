const { Router } = require('express')
const ProductController = require('../src/productController');


const routes = Router()

routes.get('/health', (_, res) => res.json('Done'))

routes.get('/products', (req, res) => {
    const productController = new ProductController();
    const products = productController.getAll();
    return res.status(200).json(products)
})

module.exports = routes
