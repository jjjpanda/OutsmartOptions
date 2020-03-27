const request = require('supertest');
const path = require('path');
const app = require('../../server/app.js');

const ticker = 'MSFT';
const tickerWithoutOptions = 'YYY';
const nonTicker = 'BRUH MOMENT';
const search = 'Apple';
const incoherentSearch = 'bruhMoment';

const waitTime = 10000;

describe('GET Website Paths /', () => {
  it('gets index path', async (done) => {
    request(app).get('/')
    .expect('Content-Type', /html/)
    .expect(200)
    .then((response) => {
      expect(response).toBeDefined()
      done();
    });
  }, waitTime);

  it('confirms 404', async (done) => {
    request(app).get('/thisIsNotARealRoute')
    .expect('Content-Type', /text/)
    .expect(404)
    .then((response) => {
      expect(response).toBeDefined()
      done();
    });
  }, waitTime);
});

describe('POST Market Data /api/market/', () => {
  describe('/quote', () => {
    it('stock quote', async (done) => {
      request(app).post('/api/market/quote')
        .send({ ticker })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.quote).toBeObject();
          expect(response.body.quote.found).toBe(true);
          expect(response.body.quote.price).toBeNumber();
          expect(response.body.quote.change).toBeNumber();
          expect(response.body.quote.name).toBeString();
          expect(response.body.quote.average_volume).toBeNumber();
          expect(response.body.quote.volume).toBeNumber();
          expect(response.body.quote.divRate).toBeNumber();
          expect(response.body.quote.divYield).toBeNumber();
          expect(response.body.quote.divDate).toBeString();
          expect(response.body.quote.earningsDate).toBeString();
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
          expect(response.body.quote.found).toBe(false);
          done();
        });
    }, waitTime);
  });

  describe('/optionsQuote', () => {
    it('options quote', async (done) => {
      request(app).post('/api/market/optionsQuote')
        .send({ ticker })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.optionsQuote).toBeObject();
          expect(response.body.optionsQuote.callOI).toBeNumber();
          expect(response.body.optionsQuote.callVol).toBeNumber();
          expect(response.body.optionsQuote.callIV).toBeNumber();
          expect(response.body.optionsQuote.callIVArray).toBeArray();
          expect(response.body.optionsQuote.putOI).toBeNumber();
          expect(response.body.optionsQuote.putVol).toBeNumber();
          expect(response.body.optionsQuote.putIV).toBeNumber();
          expect(response.body.optionsQuote.putIVArray).toBeArray();
          expect(response.body.optionsQuote.pcRatioOI).toBeNumber();
          expect(response.body.optionsQuote.pcRatioVol).toBeNumber();
          done();
        });
    }, waitTime);

    it('tests option quote of stock with no options', async (done) => {
      request(app).post('/api/market/optionsQuote')
        .send({ ticker: tickerWithoutOptions })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.error).toBe(true);
          done();
        });
    }, waitTime);

    it('tests option quote of non stock', async (done) => {
      request(app).post('/api/market/optionsQuote')
        .send({ ticker: nonTicker })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.error).toBe(true);
          done();
        });
    }, waitTime);
  });

  describe('/chain', () => {
    it('tests options chain', async (done) => {
      request(app).post('/api/market/chain')
        .send({ ticker })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.chain).toBeArray();
          expect(response.body.chain[0][0]).toBeString();
          expect(response.body.chain[0][1]).toBeArray();
          expect(response.body.chain[0][1][0]).toBeObject();
          done();
        });
    }, waitTime);

    it('tests chain of stock without options', async (done) => {
      request(app).post('/api/market/chain')
        .send({ ticker: tickerWithoutOptions })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.error).toBe(true);
          done();
        });
    }, waitTime);

    it('tests chain of non stock', async (done) => {
      request(app).post('/api/market/chain')
        .send({ ticker: nonTicker })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.error).toBe(true);
          done();
        });
    }, waitTime);
  });

  describe('/iv', () => {
    it('tests historical iv', async (done) => {
      request(app).post('/api/market/iv')
      .send({ ticker })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.historicalIV).toBeArray();
        done();
      });
    }, waitTime)

    it('tests historical iv of stock without options', async (done) => {
      request(app).post('/api/market/iv')
        .send({ ticker: tickerWithoutOptions })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.error).toBe(true);
          done();
        });
    }, waitTime)
  });

  describe('/historical', () => {
    it('tests historical data of stock', async (done) => {
      request(app).post('/api/market/historical')
        .send({ ticker })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.historical).toBeArray();
          done();
        });
    }, waitTime);

    it('tests historical data of non stock', async (done) => {
      request(app).post('/api/market/historical')
        .send({ ticker: nonTicker })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.error).toBe(true);
          done();
        });
    }, waitTime);
  });

  describe('/guessSymbol', () => {
    it('guess on a company name', async (done) => {
      request(app).post('/api/market/guessSymbol')
        .send({ text: search })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.guesses).toBeArray();
          done();
        });
    }, waitTime);

    it('guess on nonsense', async (done) => {
      request(app).post('/api/market/guessSymbol')
        .send({ text: incoherentSearch })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.error).toBe(true);
          done();
        });
    }, waitTime);
  });

  describe('/yields', () => {
    it('tests treasury yields', async (done) => {
      request(app).post('/api/market/yields')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.yields).toBeArray();
          done();
        });
    }, waitTime);
  });
});

describe('POST Bug Reports /api/bug/', () => {
  describe('/track', () => {
    it('sends ip', async (done) => {
      // /api/bug/track
      request(app).post('/api/bug/track')
        .send({ ip: '64.98.160.33' })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.details).toBe('IP Data Sent To Url');
          done();
        });
    }, waitTime);

    it('sends nothing', async (done) => {
      // /api/bug/track
      request(app).post('/api/bug/track')
        .send({ ip: 'not really an ip' })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.error).toBe(true);
          done();
        });
    }, waitTime);
  });

  describe('/report', () => {
    it('sends test message', async (done) => {
      request(app).post('/api/bug/report')
        .send({ options: ['TEST MSG'] })
        .expect(200)
        .then((response) => {
          expect(response.body.details).toBe('Details Sent to URL');
          done();
        });
    }, waitTime);
  });

  describe('/imageReport', () => {
    it('sends image', async (done) => {
      request(app).post('/api/bug/imageReport')
        .attach('file', path.join(__dirname, '../../src/img/logo.png'))
        .expect(200)
        .then((response) => {
          expect(response.body.details).toBe('Image Sent to URL');
          done();
        });
    }, waitTime);

    it('sends request with no file', async (done) => {
      request(app).post('/api/bug/imageReport')
        .expect(200)
        .then((response) => {
          expect(response.body.error).toBe(true);
          done();
        });
    }, waitTime);
  });
});

describe('POST Twitter Data /api/twitter/', () => {
  describe('/search', () => {
    it('tests twitter searching', async (done) => {
      request(app).post('/api/twitter/search')
        .send({ q: 'bruh' })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          // console.log(response.body)
          expect(response.body.tweets).toBeArray();
          done();
        });
    }, waitTime);

    it('tests twitter with no query', async (done) => {
      request(app).post('/api/twitter/search')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          // console.log(response.body)
          expect(response.body.error).toBe(true);
          done();
        });
    }, waitTime);
  });
});
