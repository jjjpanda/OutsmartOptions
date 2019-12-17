const app = require('../../server/app.js')
const request = require('supertest');
const mongoDB = require('../../server/database')

var id, token;

beforeAll(async (done) => {
    mongoDB.connect(done);
}, 50000);

afterAll(async (done) => {
    mongoDB.disconnect(done);
}, 50000);

describe('Login Tests', () => {

    it('Registers a New User', async (done) => {
        request(app).post("/api/register")
        .send({name: 'Bruh', email: 'email@email.email', password: "password", password2:"password"})
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.statusCode).toBe(200)
            done()
        })
    })

    it('Registers a New User', async (done) => {
        request(app).post("/api/register")
        .send({name: 'Bruh', email: 'email@email.email', password: "password", password2:"password"})
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.statusCode).toBe(400)
            done()
        })
    })

    it('Login Validate', async (done) => {
        request(app).post("/api/login")
        .send({email: 'email@email.email', password: "password" })
        .expect('Content-Type', /json/)
        .then(response => {
            id = response.body.id
            token = response.body.token
            expect(response.statusCode).toBe(200)
            done()
        })
    })

    it('False Login', async (done) => {
        request(app).post("/api/login")
        .send({email: 'email@email.email', password: "wrongPassword" })
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.statusCode).toBe(400)
            done()
        })
    })

    it('Authentication Validation', async (done) => {
        request(app).post("/api/current")
        .send({ id: id })
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body.email).toBe('email@email.email')
            done()
        })
    })

    it('Delete User', async (done) => {
        request(app).post("/api/delete")
        .send({ id: id })
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body.deleted).toBe(true)
            done()
        })
    })

})