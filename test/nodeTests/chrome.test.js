var webdriver = require('selenium-webdriver');

// Input capabilities
var capabilities = {
  'browserName' : 'Chrome',
  'browser_version' : '62.0',
  'os' : 'Windows',
  'os_version' : '10',
  'resolution' : '1024x768',
  'browserstack.user' : 'jjjpanda1',
  'browserstack.key' : process.env.BROWSERSTACK,
  'browserstack.local' : true,
  'browserstack.localIdentifier' : process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
  'name' : 'Chrome Test'
}

const getElementById = async (driver, id, timeout = 10000) => {
  const el = await driver.wait(webdriver.until.elementLocated(webdriver.By.id(id)), timeout);
  return await driver.wait(webdriver.until.elementIsVisible(el), timeout);
};

const getElementByName = async (drive, name, timeout = 10000) => {
  const el = await driver.wait(webdriver.until.elementLocated(webdriver.By.name(name)), timeout);
  return await driver.wait(webdriver.until.elementIsVisible(el), timeout);
}

var driver;

describe('Chrome Test', () => {

  beforeAll(async () => {
    driver = new webdriver.Builder()
    .usingServer('http://hub-cloud.browserstack.com/wd/hub')
    .withCapabilities(capabilities)
    .build();

    await driver.get("http://"+capabilities["browserstack.user"]+":"+capabilities["browserstack.key"]+"@hub-cloud.browserstack.com/wd/hub");
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('Basic Reality', (done) => {
    expect(true).toBe(true);
    done()
  }, 10000)

  it('Chrome Test', async (done) => {
    const root = await getElementById(driver, "root");
    expect(root).toBeDefined();
    done()
  }, 10000)
})