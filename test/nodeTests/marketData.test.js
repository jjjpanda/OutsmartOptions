const app = require('../../server/app.js')
const request = require('supertest');

describe('Market Data Tests', () => {

    it('Price of Stock', async (done) => {
        request(app).post("/price")
        .send({ticker: 'SPY'})
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body.price).toBeDefined()
            done()
        })
    }, 30000)

    it('Non Stock Search', async (done) => {
        request(app).post("/price")
        .send({ticker: 'NotAStock'})
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body.unmatched_symbols).toBeDefined()
            done()
        })
    }, 30000)

    it('Test Historical Data', async (done) => {
        request(app).post("/historical")
        .send({ticker: 'SPY'})
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body).toBeInstanceOf(Array)
            done()
        })
    }, 30000)

    it('Test Historical Data', async (done) => {
        request(app).post("/historical")
        .send({ticker: 'V200320P00190000'})
        .expect('Content-Type', /json/)
        .then(response => {
            console.log(response.body)
            expect(response.body).toBeInstanceOf(Array)
            done()
        })
    }, 30000)

    it('Test Historical Data with Non Stock Ticker', async (done) => {
        request(app).post("/historical")
        .send({ticker: 'NotAStock'})
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.history).toBeNull()
            done()
        })
    }, 30000)

})