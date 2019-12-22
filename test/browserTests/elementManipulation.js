export const getElementById = async (webdriver, driver, id, timeout = 1000) => {
  const el = await driver.wait(webdriver.until.elementLocated(webdriver.By.id(id)), timeout);
  return await driver.wait(webdriver.until.elementIsVisible(el), timeout);
};

export const getElementByName = async (webdriver, drive, name, timeout = 1000) => {
  const el = await driver.wait(webdriver.until.elementLocated(webdriver.By.name(name)), timeout);
  return await driver.wait(webdriver.until.elementIsVisible(el), timeout);
};
