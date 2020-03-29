const request = require('supertest');
const app = require('../../server/app.js');
const mongoDB = require('../../server/daemons/database');

const Option = require('../../server/daemons/models/Option.js')

const waitTime = 10000;
let name = 'Bruh'
let email = 'email@email.email'
let password = 'password'
let newPassword = 'newPassword'
let id; let
  token;

beforeAll(async (done) => mongoDB.connect('tests', (success) => {
  if (success) {
    done();
  } else {
    done.fail(new Error('Database Connect Error'));
  }
}), waitTime);

afterAll(async (done) => mongoDB.disconnect((success) => {
  if (success) {
    done();
  } else {
    done.fail(new Error('Database Connect Error'));
  }
}), waitTime);

describe('Consecutive Tests', () => {
  
  describe('POST User Requests /api/users/', () => {
    describe('/register', () => {
      it('registers a new user missing password retype', async (done) => {
        request(app).post('/api/users/register')
          .send({ name, email, password })
          .expect('Content-Type', /json/)
          .expect(400)
          .then((response) => {
            expect(response.body.error).toBe(true)
            done();
          });
      }, waitTime);
  
      it('registers a new user', async (done) => {
        request(app).post('/api/users/register')
          .send({ name, email, password, password2 : password })
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.registered.name).toBe(name);
            expect(response.body.registered.email).toBe(email);
            done();
          });
      }, waitTime);
  
      it('try registering with same email', async (done) => {
        request(app).post('/api/users/register')
          .send({ name, email, password, password2: password })
          .expect('Content-Type', /json/)
          .expect(400)
          .then((response) => {
            expect(response.body.error).toBe(true);
            done();
          });
      }, waitTime);
    });
  
    describe('/login', () => {
      it('login validate', async (done) => {
        request(app).post('/api/users/login')
          .send({ email, password })
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.login).toBeObject();
            expect(response.body.login.success).toBe(true);
            expect(response.body.login.id).toBeString();
            expect(response.body.login.token).toBeString()
            id = response.body.login.id;
            token = response.body.login.token;
            done();
          });
      }, waitTime);
  
      it('false login', async (done) => {
        request(app).post('/api/users/login')
          .send({ email, password: 'wrongPassword' })
          .expect('Content-Type', /json/)
          .expect(400)
          .then((response) => {
            expect(response.body.error).toBe(true);
            done();
          });
      }, waitTime);
    });
  });
  
  describe('POST Watchlist /api/watchlist/', () => {
    describe('/add', () => {
      it('tests edit watchlist to add', async (done) => {
        request(app).post('/api/watchlist/add')
          .send({ id, ticker: 'SPY' })
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.list).toMatchObject(['SPY']);
            done();
          });
      }, waitTime);
    });
  
    describe('/view', () => {
      it('view watchlist', async (done) => {
        request(app).post('/api/watchlist/view')
          .send({ id })
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.list).toMatchObject(['SPY']);
            done();
          });
      }, waitTime);
    });
  
    describe('/remove', () => {
      it('delete from watchlist', async (done) => {
        request(app).post('/api/watchlist/remove')
          .send({ id, ticker: 'SPY' })
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.list).toMatchObject([]);
            done();
          });
      }, waitTime);
    });
  });
  
  describe('POST Strategy /api/strategy/', () => {

    const underlyingTicker = 'ABC'
    const Option1 = new Option("2000-01-01", 100, 5, true, true, 3, "A000101C00010000")
    const Option2 = new Option("2000-01-01", 105, 2, true, false, 1, "A000101C00010500")

    describe('/save', () => {
      it('tests /save', async (done) => {
        request(app).post('/api/strategy/save')
          .send({ id, ticker: underlyingTicker, legs: [
            Option1, // Array of Options should pass
            Option2, // Or Object imitating Option
            {date: "2000-01-01", strike: 100, price: 0.5, isCall: false, isLong: true, quantity: 2, symbol: "A000101P00010000"}
          ] }) 
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.saved).toBe(true);
            done();
          });
      }, waitTime);
  
      it('tests badly formatted /save', async (done) => {
        request(app).post('/api/strategy/save')
          .send({ id, ticker: underlyingTicker, strategy: [7, 7, 7] }) // Array with anything other than Options should fail
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .expect(400)
          .then((response) => {
            expect(response.body.error).toBe(true);
            done();
          });
      }, waitTime);
    });
  
    describe('/load', () => {
      it('Tests /load', async (done) => {
        request(app).post('/api/strategy/load')
          .send({ id, ticker: underlyingTicker })
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.strategies[0].legs[0].date).toMatchObject(Option2);
            done();
          });
      }, waitTime);
    });
  
    describe('/delete', () => {
      it('tests /delete', async (done) => {
        request(app).post('/api/strategy/delete')
          .send({ id, ticker: underlyingTicker, legs: [
            Option1,
            Option2, 
            {date: "2000-01-01", strike: 100, price: 0.5, isCall: false, isLong: true, quantity: 2, symbol: "A000101P00010000" }
          ] })
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            console.log(response.body);
            expect(response.body.deleted).toBe(true);
            done();
          });
      }, waitTime);
    });
  });
  
  describe('POST Logged In User Requests /api/users/', () => {
    describe('/current', () => {
      it('authentication validation', async (done) => {
        request(app).post('/api/users/current')
          .send({ id })
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.current.email).toBe(email);
            expect(response.body.current.name).toBe(name)
            done();
          });
      }, waitTime);
  
      it('authentication validation with no token', async (done) => {
        request(app).post('/api/users/current')
          .send({ id })
          .expect('Content-Type', /json/)
          .expect(401)
          .then((response) => {
            expect(response.body.unauthorized).toBe(true)
            done();
          });
      }, waitTime);
    });
  
    describe('/change', () => {
      it('password changing', async (done) => {
        request(app).post('/api/users/change')
          .send({ id, oldPassword: password, newPassword, newPassword2: newPassword })
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.changed).toBe(true);
            done();
          });
      }, waitTime);
  
      it('incorrect password changing', async (done) => {
        request(app).post('/api/users/change')
          .send({ id, oldPassword: 'passwordThatsWrong', newPassword: 'shouldntReallyMatter', newPassword2: 'shouldntReallyMatter' })
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .expect(400)
          .then((response) => {
            expect(response.body.error).toBeDefined();
            done();
          });
      }, waitTime);
    });
  
    describe('/delete', () => {
      it('delete user', async (done) => {
        request(app).post('/api/users/delete')
          .send({ id })
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.deleted).toBe(true);
            done();
          });
      }, waitTime);
    });
  });
  
})