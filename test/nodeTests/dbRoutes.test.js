const app = require('../../server/app.js')
const request = require('supertest');
const mongoDB = require('../../server/database')

var id, token;

beforeAll(async (done) => {
    return mongoDB.connect(done);
}, 50000);

afterAll(async (done) => {
    return mongoDB.disconnect(done);
}, 50000);

describe('POST /api/users/', () => {

    it('Registers a New User', async (done) => {
        request(app).post("/api/users/register")
        .send({name: 'Bruh', email: 'email@email.email', password: "password", password2:"password"})
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body._id).toBeDefined()
            done()
        })
    }, 30000)

    it('Registers a New User', async (done) => {
        request(app).post("/api/users/register")
        .send({name: 'Bruh', email: 'email@email.email', password: "password", password2:"password"})
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.statusCode).toBe(400)
            done()
        })
    }, 30000)

    it('Login Validate', async (done) => {
        request(app).post("/api/users/login")
        .send({email: 'email@email.email', password: "password" })
        .expect('Content-Type', /json/)
        .then(response => {
            id = response.body.id
            token = response.body.token
            expect(response.body.success).toBe(true)
            done()
        })
    }, 30000)

    it('False Login', async (done) => {
        request(app).post("/api/users/login")
        .send({email: 'email@email.email', password: "wrongPassword" })
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.statusCode).toBe(400)
            done()
        })
    }, 30000)

    it('Authentication Validation', async (done) => {
        request(app).post("/api/users/current")
        .send({ id: id })
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body.email).toBe('email@email.email')
            done()
        })
    }, 30000)

    it('Delete User', async (done) => {
        request(app).post("/api/users/delete")
        .send({ id: id })
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body.deleted).toBe(true)
            done()
        })
    }, 30000)

})

describe('POST Earnings /api/market/', () => {

    it('Tests /earningsDate', async (done) => {
        // /api/market/earningsDate
        done()
    }, 30000)

})

describe('POST Strategy /api/strategy/', () => {

    it('Tests /load', async (done) => {
        // /api/strategy/load
        done()
    }, 30000)

    it('Tests /save', async (done) => {
        // /api/strategy/save
        done()
    }, 30000)

})

describe('POST Watchlist /api/watchlist/', () => {

    it('Tests /view', async (done) => {
        // /api/watchlist/view
        done()
    }, 30000)

    it('Tests /edit', async (done) => {
        // /api/watchlist/edit
        done()
    }, 30000)

})