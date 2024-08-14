const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: true,
  resolveRequest: (context, moduleName, platform) => {
    if (moduleName == 'libxslt') {
      return { type: 'empty' };
    }
    // Optionally, chain to the standard Metro resolver.
    return context.resolveRequest(context, moduleName, platform);
  }
};

module.exports = config;
