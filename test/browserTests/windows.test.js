import * as eleManip from './elementManipulation.js';
import * as capabilities from './browsers.js';

const webdriver = require('selenium-webdriver');
const browserstack = require('browserstack-local');
const env = require('dotenv').config();

const bs_local = new browserstack.Local();
const bs_local_args = { key: capabilities.credentials['browserstack.key'], onlyAutomate: true, logFile: 'test/browserTests/log.txt' };

const start = async () => new Promise((resolve, reject) => {
  bs_local.start(bs_local_args, (error) => {
    if (error) {
      reject(error);
    }
    console.log('Started BrowserStackLocal');
    resolve();
  });
});

const stop = async () => new Promise((resolve, reject) => {
  bs_local.stop((error) => {
    if (error) {
      reject();
    }
    console.log('Stopped BrowserStackLocal');
    resolve();
  });
});

beforeAll(async () => {
  await start();
}, 10000);

afterAll(async () => {
  await stop();
}, 10000);

for (let capability of capabilities.capabilities) {
  describe(capability.name, () => {
    let driver;

    beforeAll(async (done) => {
      driver = new webdriver.Builder()
        .usingServer(`http://${capabilities.credentials['browserstack.user']}:${capabilities.credentials['browserstack.key']}@hub-cloud.browserstack.com/wd/hub`)
        .withCapabilities(capability)
        .build();

      await driver.get('https://outsmart.herokuapp.com').then(() => {
        done();
      }, () => {
        done.fail(new Error("Website Didn't Load."))
      });
    }, 50000);

    afterAll(async (done) => {
      await driver.quit().then(() => {
        done();
      }, () => {
        done.fail(new Error("Issue with disconnecting."))
      });
    }, 10000);

    it('React Root Exists', async (done) => {
      const root = await eleManip.getElementById(webdriver, driver, 'root');
      expect(root).toBeDefined();
      done();
    }, 10000);

    it('Go to Calculator', async (done) => {
      await driver.get('https://outsmart.herokuapp.com/calc').then(() => {
        done();
      }, () => {
        done.fail(new Error("Website Didn't Load."))
      });
    }, 10000)

    it('Go to Watchlist', async (done) => {
      await driver.get('https://outsmart.herokuapp.com/watch').then(() => {
        done();
      }, () => {
        done.fail(new Error("Website Didn't Load."))
      });
    }, 10000)

    it('Go to HelpPage', async (done) => {
      await driver.get('https://outsmart.herokuapp.com/help').then(() => {
        done();
      }, () => {
        done.fail(new Error("Website Didn't Load."))
      });
    }, 10000)

    it('Go to AboutPage', async (done) => {
      await driver.get('https://outsmart.herokuapp.com/about').then(() => {
        done();
      }, () => {
        done.fail(new Error("Website Didn't Load."))
      });
    }, 10000)
    
  });
}
