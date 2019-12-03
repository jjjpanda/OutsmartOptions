import * as eleManip from './elementManipulation.js'
import * as capabilities from './windowsBrowsers.js'

var webdriver = require('selenium-webdriver');
var browserstack = require('browserstack-local');
const env = require('dotenv').config();

var driver;
var bs_local = new browserstack.Local();
var bs_local_args = { 'key': capabilities.credentials["browserstack.key"], onlyAutomate: true };

console.log(bs_local_args)

const start = async () =>
  new Promise((resolve, reject) => {
    bs_local.start(bs_local_args, function(error) {
      if(error){
        reject(error)
      }
      console.log("Started BrowserStackLocal");
      resolve()
  });
});

const stop = async () =>
  new Promise((resolve, reject) => {
    bs_local.stop(function(error) {
      if(error){
        reject()
      }
      console.log("Stopped BrowserStackLocal");
      resolve()
  });
});

beforeAll(async () => {
    await start();
}, 10000);

afterAll(async () => {
    await stop();
}, 10000);

for(var capability of capabilities.capabilities){

  describe(capability.name, () => {

    beforeAll(async () => {
      driver = new webdriver.Builder()
      .usingServer("http://"+capabilities.credentials["browserstack.user"]+":"+capabilities.credentials["browserstack.key"]+"@hub-cloud.browserstack.com/wd/hub")
      .withCapabilities(capability)
      .build();
    
      await driver.get("https://outsmart.herokuapp.com");
    }, 10000)

    afterAll(async () => {
      await driver.close();
    }, 10000)

    it(capability.name, async () => {
      const root = await eleManip.getElementById(webdriver, driver, "root");
      expect(root).toBeDefined();
    }, 10000)

  })

}