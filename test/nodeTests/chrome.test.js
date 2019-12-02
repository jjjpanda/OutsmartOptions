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
 'name' : 'Chrome Test'
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

describe('Chrome Test', () => {
  it('Test Chrome Browser', () => {
    driver.get('http://www.google.com').then(function(){
      driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack\n').then(function(){
        driver.getTitle().then(function(title) {
          console.log(title);
          driver.quit();
        });
      });
    });
    expect(true).toBe(true);

  })
})