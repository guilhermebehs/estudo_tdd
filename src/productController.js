const fs = require('fs')


class ProductController {

    constructor() {
        this.dataFile = __dirname + '/mockData.json';
    }

    getDataFromFile() {
        const data = JSON.parse(fs.readFileSync(this.dataFile).toString())
        return data;
    }

    updateDataInFile(data) {
        fs.writeFileSync(this.dataFile, JSON.stringify(data))
    }

    get(id) {

        const products = this.getDataFromFile();

        return products.find(product => product.id === id) || {}


    }

    getAll() {

        const products = this.getDataFromFile();
        return products;
    }

    create(newProduct) {

        const products = this.getDataFromFile();

        newProduct.id = products.length + 1
        products.push(newProduct)
        this.updateDataInFile(products)
        return newProduct.id
    }

    delete(id) {

        const products = this.getDataFromFile();

        const productToBeDeleted = products.find(product => product.id === id)

        if (productToBeDeleted) {
            products.splice((productToBeDeleted.id - 1), 1)
            this.updateDataInFile(products)
            return 'Done'
        }

        return `Id ${id} not found`


    }

    update(id, price) {

        const products = this.getDataFromFile();

        const productToBeUpdated = products.find(product => product.id === id)

        if (productToBeUpdated) {
            productToBeUpdated.price = price
            products[productToBeUpdated.id - 1] = productToBeUpdated;
            this.updateDataInFile(products)
            return 'Done'
        }

        return `Id ${id} not found`

    }

}

module.exports = ProductController;