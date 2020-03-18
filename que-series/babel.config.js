module.exports = (api)=> {
  api.cache(true);
  const presets = [
    "@babel/preset-env"
  ]
  const plugins = [
    ["@babel/plugin-transform-modules-commonjs", {
      "allowTopLevelThis": true
    }]
  ]
  return {
    presets,
    plugins
  };
}