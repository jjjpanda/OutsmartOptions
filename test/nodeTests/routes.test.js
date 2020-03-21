const request = require('supertest');
const path = require('path');
const app = require('../../server/app.js');

let ticker = 'MSFT'
let tickerWithoutOptions = "YYY"
let nonTicker = "BRUH MOMENT"
let search = 'Apple'
let incoherentSearch = "bruhMoment"

let waitTime = 10000

describe('GET Website Paths /', () => {
  it('gets index path', async (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  }, waitTime);

  it('confirms 404', async (done) => {
    request(app).get('/thisIsNotARealRoute').then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  }, waitTime);
});

describe('POST Market Data /api/market/', () => {
  it('stock quote', async (done) => {
    request(app).post('/api/market/quote')
      .send({ ticker: ticker })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.quote).toBeObject();
        expect(response.body.quote.found).toBe(true);
        expect(response.body.quote.price).toBeNumber()
        expect(response.body.quote.change).toBeNumber()
        expect(response.body.quote.name).toBeString()
        expect(response.body.quote.average_volume).toBeNumber()
        expect(response.body.quote.volume).toBeNumber()
        expect(response.body.quote.divRate).toBeNumber()
        expect(response.body.quote.divYield).toBeNumber()
        expect(response.body.quote.divDate).toBeString()
        expect(response.body.quote.earningsDate).toBeString()
        done();
      });
  }, waitTime);

  it('non stock search', async (done) => {
    request(app).post('/api/market/quote')
      .send({ ticker: nonTicker })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.quote).toBeObject();
        expect(response.body.quote.found).toBe(false)
        done();
      });
  }, waitTime);

  it('tests options chain', async (done) => {
    request(app).post('/api/market/chain')
      .send({ ticker: ticker })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.chain).toBeArray();
        expect(response.body.chain[0][0]).toBeString()
        expect(response.body.chain[0][1]).toBeArray()
        expect(response.body.chain[0][1][0]).toBeObject()
        done();
      });
  }, waitTime);

  it('tests chain of stock without options', async (done) => {
    request(app).post('/api/market/chain')
      .send({ ticker: tickerWithoutOptions })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.error).toBe(true)
        done();
      });
  }, waitTime);

  it('tests chain of non stock', async (done) => {
    request(app).post('/api/market/chain')
      .send({ ticker: nonTicker })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.error).toBe(true)
        done();
      });
  }, waitTime);

  it('options quote', async (done) => {
    request(app).post('/api/market/optionsQuote')
      .send({ ticker: ticker })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.optionsQuote).toBeObject();
        expect(response.body.optionsQuote.callOI).toBeNumber()
        expect(response.body.optionsQuote.callVol).toBeNumber()
        expect(response.body.optionsQuote.callIV).toBeNumber()
        expect(response.body.optionsQuote.callIVArray).toBeArray()
        expect(response.body.optionsQuote.putOI).toBeNumber()
        expect(response.body.optionsQuote.putVol).toBeNumber()
        expect(response.body.optionsQuote.putIV).toBeNumber()
        expect(response.body.optionsQuote.putIVArray).toBeArray()
        expect(response.body.optionsQuote.pcRatioOI).toBeNumber()
        expect(response.body.optionsQuote.pcRatioVol).toBeNumber()
        done();
      });
  }, waitTime);

  it('tests option quote of stock with no options', async (done) => {
    request(app).post('/api/market/optionsQuote')
      .send({ ticker: tickerWithoutOptions })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.error).toBe(true)
        done();
      });
  }, waitTime);

  it('tests option quote of non stock', async (done) => {
    request(app).post('/api/market/optionsQuote')
      .send({ ticker: nonTicker })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.error).toBe(true)
        done();
      });
  }, waitTime);

  it('Tests /api/market/guessSymbol', async (done) => {
    request(app).post('/api/market/guessSymbol')
      .send({ text: search })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.guesses).toBeArray();
        done();
      });
  }, waitTime);

  it('Tests /api/market/guessSymbol', async (done) => {
    request(app).post('/api/market/guessSymbol')
      .send({ text: incoherentSearch })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.error).toBe(true)
        done();
      });
  }, waitTime);

  it('Tests /treasury', async (done) => {
    request(app).post('/api/market/yields')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.yields).toBeArray();
        done();
      });
  }, waitTime);
});

describe('POST Bug Reports /api/bug/', () => {
  it('Tests /track', async (done) => {
    // /api/bug/track
    request(app).post('/api/bug/track')
      .send({ ip: '64.233.160.33' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.details).toBe('IP Data Sent To Url');
        done();
      });
  }, waitTime);

  it('Tests /report', async (done) => {
    request(app).post('/api/bug/report')
      .send({ options: ['TEST MSG'] })
      .expect(200)
      .then((response) => {
        expect(response.body.details).toBe('Details Sent to URL');
        done();
      });
  }, waitTime);

  it('Tests /imageReport', async (done) => {
    request(app).post('/api/bug/imageReport')
      .attach('file', path.join(__dirname, '../../src/img/logo.png'))
      .expect(200)
      .then((response) => {
        expect(response.body.details).toBe('Image Sent to URL');
        done();
      });
  }, waitTime);
});

describe('POST Market Data /api/twitter/', () => {
  it('Tests /api/twitter/search', async (done) => {
    request(app).post('/api/twitter/search')
      .send({ q: 'bruh' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        // console.log(response.body)
        expect(response.body).toBeDefined();
        done();
      });
  }, waitTime);
});
