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

        for (let i = 0; i < products.length; i++)
            if (products[i].id === id)
                return products[i]

        return {}

    }

    getAll() {

        const products = this.getDataFromFile();
        return products;
    }

    delete(id) {

        const products = this.getDataFromFile();
        let count = 0;
        for (let i = 0; i < products.length; i++)
            if (products[i].id === id) {
                products.splice(i, 1)
                count++
            }

        if (count > 0)
            this.updateDataInFile(products)

        return count


    }

    create(newProduct) {

        const products = this.getDataFromFile();

        newProduct.id = products.length + 1
        products.push(newProduct)
        this.updateDataInFile(products)
        return newProduct.id
    }

    update(id, price) {

        const products = this.getDataFromFile();

        let count = 0;
        for (let i = 0; i < products.length; i++)
            if (products[i].id === id) {
                products[i].price = price
                count++
            }

        if (count > 0)
            this.updateDataInFile(products)

        return count

    }

}

module.exports = ProductController;