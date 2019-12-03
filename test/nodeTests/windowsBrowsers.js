export var credentials = {
  'browserstack.user' : 'jjjpanda1',
  'browserstack.key' : process.env.BROWSERSTACK,
  'browserstack.local' : true
}

export var capabilities = [{
  'browserName' : 'Chrome',
  'browser_version' : '62.0',
  'os' : 'Windows',
  'os_version' : '10',
  'resolution' : '1024x768',
  ...credentials,
  'name' : 'Chrome Test'
},
{
  'browserName' : 'Firefox',
  'browser_version' : '70.0',
  'os' : 'Windows',
  'os_version' : '10',
  'resolution' : '1024x768',
  ...credentials,
  'name' : 'Firefox Test'
}
]