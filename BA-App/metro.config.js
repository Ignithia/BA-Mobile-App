const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("ts", "tsx", "js", "jsx", "json", "mjs");
config.resolver.resolverMainFields = ["react-native", "browser", "main"];

module.exports = config;
