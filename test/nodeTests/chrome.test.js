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

const getElementById = async (driver, id, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByName = async (drive, name, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
}

describe('Chrome Test', () => {

  beforeAll(async () => {
    var driver = new webdriver.Builder()
    .usingServer('http://hub-cloud.browserstack.com/wd/hub')
    .withCapabilities(capabilities)
    .build();

    await driver.get("http://"+capabilities["browserstack.user"]+":"+capabilities["browserstack.key"]+"@hub-cloud.browserstack.com/wd/hub");
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('Basic Reality', () => {
    expect(true).toBe(true);
  })

  it('Chrome Test', async () => {
    const root = await getElementById(driver, "root");
    expect(root).toBeDefined();
  })
})