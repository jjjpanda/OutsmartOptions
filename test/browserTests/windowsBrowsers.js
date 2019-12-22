export var credentials = {
  'browserstack.user': 'jjjpanda1',
  'browserstack.key': process.env.BROWSERSTACK,
  'browserstack.local': true,
};

export var capabilities = [{
  browserName: 'Chrome',
  browser_version: '62.0',
  os: 'Windows',
  os_version: '10',
  resolution: '1024x768',
  ...credentials,
  name: 'Chrome Test',
},
{
  browserName: 'Firefox',
  browser_version: '70.0',
  os: 'Windows',
  os_version: '10',
  resolution: '1024x768',
  ...credentials,
  name: 'Firefox Test',
},
{
  browserName: 'Safari',
  browser_version: '13.0',
  os: 'OS X',
  os_version: 'Catalina',
  resolution: '1024x768',
  ...credentials,
  name: 'Safari Test',
},
{
  browserName: 'IE',
  browser_version: '11.0',
  os: 'Windows',
  os_version: '10',
  resolution: '1024x768',
  ...credentials,
  name: 'Edge Test',
},
];
