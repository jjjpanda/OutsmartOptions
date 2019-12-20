const app = require('../../server/app.js')
const request = require('supertest');

describe('GET Website Paths /', () => {
    
    it('Gets /', async (done) => {
        request(app).get("/").then(response => {
            expect(response.statusCode).toBe(200)
            done()
        })
    }, 30000)

    it('Confirms 404', async (done) => {
        request(app).get("/thisIsNotARealRoute").then(response => {
            expect(response.statusCode).toBe(404)
            done()
        })
    }, 30000)
})

describe('POST Market Data /api/market/', () => {

    it('Price of Stock', async (done) => {
        request(app).post("/api/market/price")
        .send({ticker: 'SPY'})
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body.price).toBeDefined()
            done()
        })
    }, 30000)

    it('Non Stock Search', async (done) => {
        request(app).post("/api/market/price")
        .send({ticker: 'NotAStock'})
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body.unmatched_symbols).toBeDefined()
            done()
        })
    }, 30000)

    it('Tests /chain', async (done) => {
        request(app).post("/api/market/chain")
        .send({ticker: 'SPY'})
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body).toBeInstanceOf(Array)
            done()
        })
    }, 30000)

    it('Test Historical Data', async (done) => {
        request(app).post("/api/market/historical")
        .send({ticker: 'SPY'})
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body).toBeInstanceOf(Array)
            done()
        })
    }, 30000)

    it('Test Historical Data', async (done) => {
        request(app).post("/api/market/historical")
        .send({ticker: 'V200320P00190000'})
        .expect('Content-Type', /json/)
        .then(response => {
            console.log(response.body)
            expect(response.body).toBeInstanceOf(Array)
            done()
        })
    }, 30000)

    it('Test Historical Data with Non Stock Ticker', async (done) => {
        request(app).post("/api/market/historical")
        .send({ticker: 'NotAStock'})
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.history).toBeNull()
            done()
        })
    }, 30000)

    it('Tests /api/market/guessSymbol', async (done) => {
        request(app).post("/api/market/guessSymbol")
        .send({text: 'Google'})
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            console.log(response)
            expect(response).toBe(true)
            done()
        })
    }, 30000)

    it('Tests /divYield', async (done) => {
        request(app).post("/api/market/divYield")
        .send({text: 'Apple'})
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            console.log(response)
            expect(response).toBe(true)
            done()
        })
    }, 30000)

    it('Tests /treasury', async (done) => {
        request(app).post("/api/market/treasury")
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            console.log(response)
            expect(response).toBe(true)
            done()
        })
    }, 30000)

})

describe('POST Bug Reports /api/bug/', () => {

    it('Tests /track', async (done) => {
        // /api/bug/track
        request(app).post("/api/bug/track")
        .send({ip: '127.0.0.1'})
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            console.log(response)
            expect(response).toBe(true)
            done()
        })
    }, 30000)

    it('Tests /report', async (done) => {
        request(app).post("/api/bug/report")
        .send({options: ['TEST MSG']})
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            console.log(response)
            expect(response).toBe(true)
            done()
        })
    }, 30000)

    it('Tests /imageReport', async (done) => {
        request(app).post("/api/bug/imageReport")
        .attach('data', '../../src/img/logo.png')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            console.log(response)
            expect(response).toBe(true)
            done()
        })
    }, 30000)

})