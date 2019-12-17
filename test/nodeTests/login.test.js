const app = require('../../server/app.js')
const request = require('supertest');
const mongoDB = require('../../server/database')

describe('Login Tests', () => {

    beforeAll(async (done) => {
        mongoDB.connect(done);
    }, 50000);
    
    afterAll(async (done) => {
        mongoDB.disconnect(done);
    }, 50000);

    it('Gets /', async (done) => {
        request(app).get("/").then(response => {
            expect(response.statusCode).toBe(200)
            done()
        })
    })

})