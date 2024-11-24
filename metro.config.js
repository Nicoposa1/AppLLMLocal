const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('pte');
defaultConfig.resolver.assetExts.push('bin');

const config = {};

module.exports = mergeConfig(defaultConfig, config);