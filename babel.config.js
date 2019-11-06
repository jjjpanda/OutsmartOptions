module.exports = (api) => {
    api.cache(true);
    const presets = [
        "@babel/preset-env","@babel/preset-react"
    ]
    const plugins =  [
        ["import", {"libraryName": "antd", "style": true} ],
        "@babel/plugin-proposal-class-properties"
    ]
    return {
        presets,
        plugins
    };
}