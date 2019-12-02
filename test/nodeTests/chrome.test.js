var webdriver = require('selenium-webdriver');
const path = require('path');

// Input capabilities
var capabilities = {
  'browserName' : 'Chrome',
  'browser_version' : '62.0',
  'os' : 'Windows',
  'os_version' : '10',
  'resolution' : '1024x768',
  'app' : process.env.BROWSERSTACK_APP_ID,
  'browserstack.user' : 'jjjpanda1',
  'browserstack.key' : process.env.BROWSERSTACK,
  'name' : 'Chrome Test'
}

const getElementById = async (driver, id, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

describe('Chrome Test', () => {
  beforeAll(async () => {
    var driver = new webdriver.Builder()
    .usingServer('http://hub-cloud.browserstack.com/wd/hub')
    .withCapabilities(capabilities)
    .build();

    await driver.get( "http://"+capabilities["browserstack.user"]+".browserstack.com/app.html" );
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('Chrome Test', () => {
    const root = await getElementById(driver, "root");

    expect(root).toBeDefined();
  })
})