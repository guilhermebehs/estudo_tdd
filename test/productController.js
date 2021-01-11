const ProductController = require('../src/productController');
const fs = require('fs')
const chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

describe('Products', () => {

    //Restore initial state of file containg mock data
    (() => {
        const dataFileInitialState = __dirname + '/mockDataInitialState.json';
        const dataFileMockData = 'src/mockData.json';
        const initialState = JSON.parse(fs.readFileSync(dataFileInitialState).toString())
        fs.writeFileSync(dataFileMockData, JSON.stringify(initialState))
    })()
    describe('Unit Test', () => {

        describe('getAll', () => {
            it('Validando o conteúdo do getAll', (done) => {
                const productController = new ProductController();
                const result = productController.getAll();
                result.should.be.a('array');
                result.should.have.lengthOf(2);
                done()
            })
        })

        describe('get', () => {
            it('Validando o conteúdo do get', (done) => {
                const productController = new ProductController();
                const result = productController.get(1);
                result.should.be.a('object');
                result.should.be.have.property('id');
                result.should.be.have.property('name');
                result.should.be.have.property('price');
                done()
            })
        })

        describe('create', () => {
            it('Validando o retorno do create', (done) => {
                const productController = new ProductController();
                const product = { name: 'ricota', price: 2.5 }
                const result = productController.create(product);
                result.should.be.a('number')
                expect(result).to.be.at.least(3)

                done()
            })
        })

        describe('delete', () => {
            it('Validando o retorno do delete', (done) => {
                const productController = new ProductController();
                const result2 = productController.delete(2);
                expect(result2).to.be.at.least(1)

                done()
            })
        })


        describe('update', () => {
            it('Validando o retorno do update', (done) => {
                const productController = new ProductController();
                const result2 = productController.update(1, 1);
                expect(result2).to.be.at.least(1)

                done()
            })
        })

    })
    describe('Integration Test', () => {
    })

})




