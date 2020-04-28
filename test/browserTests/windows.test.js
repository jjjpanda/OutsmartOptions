import * as eleManip from './elementManipulation.js';
import * as capabilities from './browsers.js';

const webdriver = require('selenium-webdriver');
const browserstack = require('browserstack-local');
const env = require('dotenv').config();

const port = process.env.PORT;

const waitTime = 15000;

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
}, waitTime);

afterAll(async () => {
  await stop();
}, waitTime);

const domains = ['http://www.outsmartoptions.live'];

for (const capability of capabilities.capabilities) {
  for (const website of domains) {
    describe(capability.name, () => {
      let driver;

      beforeAll(async (done) => {
        driver = new webdriver.Builder()
          .usingServer(`http://${capabilities.credentials['browserstack.user']}:${capabilities.credentials['browserstack.key']}@hub-cloud.browserstack.com/wd/hub`)
          .withCapabilities(capability)
          .build();

        await driver.get(website).then(() => {
          done();
        }, () => {
          done.fail(new Error("Website Didn't Load."));
        });
      }, waitTime * 5);

      afterAll(async (done) => {
        await driver.quit().then(() => {
          done();
        }, () => {
          done.fail(new Error('Issue with disconnecting.'));
        });
      }, waitTime);

      it('React Root Exists', async (done) => {
        const root = await eleManip.getElementById(webdriver, driver, 'root');
        expect(root).toBeDefined();
        done();
      }, waitTime);

      it('Go to Calculator', async (done) => {
        await driver.get(`${website}/calc`).then(() => {
          done();
        }, () => {
          done.fail(new Error("Website Didn't Load."));
        });
      }, waitTime);

      it('Go to Watchlist', async (done) => {
        await driver.get(`${website}/watch`).then(() => {
          done();
        }, () => {
          done.fail(new Error("Website Didn't Load."));
        });
      }, waitTime);

      it('Go to HelpPage', async (done) => {
        await driver.get(`${website}/help`).then(() => {
          done();
        }, () => {
          done.fail(new Error("Website Didn't Load."));
        });
      }, waitTime);

      it('Go to AboutPage', async (done) => {
        await driver.get(`${website}/about`).then(() => {
          done();
        }, () => {
          done.fail(new Error("Website Didn't Load."));
        });
      }, waitTime);
    });
  }
}
