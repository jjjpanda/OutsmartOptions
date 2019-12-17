const app = require('../../server/app.js')
const request = require('supertest');

describe('GET Website Paths', () => {
    
    it('Gets /', async (done) => {
        request(app).get("/").then(response => {
            expect(response.statusCode).toBe(200)
            done()
        })
    })

    it('Confirms 404', async (done) => {
        request(app).get("/thisIsNotARealRoute").then(response => {
            expect(response.statusCode).toBe(404)
            done()
        })
    })
})