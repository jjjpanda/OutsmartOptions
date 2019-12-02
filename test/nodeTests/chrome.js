var webdriver = require('selenium-webdriver');

// Input capabilities
var capabilities = {
 'browserName' : 'iPhone',
 'device' : 'iPhone 8 Plus',
 'realMobile' : 'true',
 'os_version' : '11',
 'browserstack.user' : 'jjjpanda1',
 'browserstack.key' : 'DMCxJwE8FL3hexqnqfnt',
 'name' : 'Bstack-[Node] Sample Test'
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

driver.get('http://www.google.com').then(function(){
  driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack\n').then(function(){
    driver.getTitle().then(function(title) {
      console.log(title);
      driver.quit();
    });
  });
});