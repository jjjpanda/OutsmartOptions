const request = require('supertest');
const app = require('../../server/app.js');
const mongoDB = require('../../server/database');

let id; let
  token;

beforeAll(async (done) => mongoDB.connect('tests', (success) => {
  if(success){
    done()
  }
  else{
    done.fail(new Error('Database Connect Error'))
  }
}), 50000);

afterAll(async (done) => mongoDB.disconnect((success) => {
  if(success){
    done()
  }
  else{
    done.fail(new Error('Database Connect Error'))
  }
}), 50000);

describe('POST /api/users/', () => {
  it('Registers a New User', async (done) => {
    request(app).post('/api/users/register')
      .send({
        name: 'Bruh', email: 'email@email.email', password: 'password', password2: 'password',
      })
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body._id).toBeDefined();
        done();
      });
  }, 30000);

  it('Registers a New User', async (done) => {
    request(app).post('/api/users/register')
      .send({
        name: 'Bruh', email: 'email@email.email', password: 'password', password2: 'password',
      })
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  }, 30000);

  it('Login Validate', async (done) => {
    request(app).post('/api/users/login')
      .send({ email: 'email@email.email', password: 'password' })
      .expect('Content-Type', /json/)
      .then((response) => {
        id = response.body.id;
        token = response.body.token;
        expect(response.body.success).toBe(true);
        done();
      });
  }, 30000);

  it('False Login', async (done) => {
    request(app).post('/api/users/login')
      .send({ email: 'email@email.email', password: 'wrongPassword' })
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  }, 30000);
});

describe('Public Routes', () => {
  describe('POST Earnings /api/market/', () => {
    it('Tests /earningsDate', async (done) => {
      request(app).post('/api/market/earningsDate')
        .send({ ticker: 'SPY' }) // The infamous SP500 Earnings
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.erSoon).toBe(false);
          done();
        });
    }, 30000);
  });
});

describe('Protected Routes', () => {
  describe('POST Strategy /api/strategy/', () => {
    it('Tests /save', async (done) => {
      request(app).post('/api/strategy/save')
        .send({ id, ticker: 'SPY', strategy: [{ strike: 30 }, { price: 2 }, { quantity: 4 }] }) // Array of Objects should pass
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.strategy).toBe(true);
          done();
        });
    }, 30000);

    it('Tests badly formatted /save', async (done) => {
      request(app).post('/api/strategy/save')
        .send({ id, ticker: 'SPY', strategy: [7, 7, 7] }) // Array with anything other than Objects should fail
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.details).toBe('Badly Formatted Strategies, Not Array of Objects');
          done();
        });
    }, 30000);

    it('Tests badly formatted /save', async (done) => {
      request(app).post('/api/strategy/save')
        .send({ id, ticker: 'SPY', strategy: 14 }) // No Array, No pass
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.details).toBe('Badly Formatted Strategies, Not Array');
          done();
        });
    }, 30000);

    it('Tests /load', async (done) => {
      request(app).post('/api/strategy/load')
        .send({ id, ticker: 'SPY' })
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.strategies[0].legs).toMatchObject([{ strike: 30 }, { price: 2 }, { quantity: 4 }]);
          done();
        });
    }, 30000);

    it('Tests /delete', async (done) => {
      request(app).post('/api/strategy/delete')
        .send({ id, ticker: 'SPY', strategy: [{ strike: 30 }, { price: 2 }, { quantity: 4 }] })
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          console.log(response.body);
          expect(response.body.details.deletedCount).toBe(1);
          done();
        });
    }, 30000);
  });

  describe('POST Watchlist /api/watchlist/', () => {
    it('Tests /edit to add', async (done) => {
      request(app).post('/api/watchlist/edit')
        .send({ id, ticker: 'SPY' })
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.list).toMatchObject(['SPY']);
          done();
        });
    }, 30000);

    it('Tests /view', async (done) => {
      request(app).post('/api/watchlist/view')
        .send({ id })
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.list).toMatchObject(['SPY']);
          done();
        });
    }, 30000);

    it('Tests /edit to delete', async (done) => {
      request(app).post('/api/watchlist/edit')
        .send({ id, ticker: 'SPY' })
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.list).toMatchObject([]);
          done();
        });
    }, 30000);
  });

  describe('User Related Routes', () => {
    it('Authentication Validation', async (done) => {
      request(app).post('/api/users/current')
        .send({ id })
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.email).toBe('email@email.email');
          done();
        });
    }, 30000);

    it('Delete User', async (done) => {
      request(app).post('/api/users/delete')
        .send({ id })
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.deleted).toBe(true);
          done();
        });
    }, 30000);
  });
});
