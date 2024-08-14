const { AndroidConfig, withStringsXml } = require('expo/config-plugins');

function withLocalizedStrings(config, filepath) {
  return withStringsXml(config, config => {
    config.modResults = setStrings(config.modResults, value);
    return config;
  });
}

function setStrings(strings, value) {
  // Helper to add string.xml JSON items or overwrite existing items with the same name.
  return AndroidConfig.Strings.setStringItem(
    [
      // XML represented as JSON
      // <string name="expo_custom_value" translatable="false">value</string>
      { $: { name: 'expo_custom_value', translatable: 'false' }, _: value },
    ],
    strings
  );
  AndroidConfig.Strings.
}

module.exports = withLocalizedStrings;

const fs = require('fs');
const path = require('path');
const { withStringsXml, AndroidConfig } = require('@expo/config-plugins');
const xml2js = require('xml2js');
const builder = new xml2js.Builder({ headless: true });

const localesFilepath = '../locales';

function withAndroidLocalizedName(config, filepath) {
  return withStringsXml(config,
    async config => {
      // which folders are in the 'localesFilepath' directory?
      const locales = await fs.promises.readdir(localesFilepath);
      
            const projectRoot = config.modRequest.projectRoot;
            const resPath = await AndroidConfig.Paths.getResourceFolderAsync(projectRoot);
            for (const locale of Object.keys(config.locales ?? {})) {
                const json = await fs.promises.readFile(config.locales[locale]);
                const strings = JSON.parse(json);
                const resources = [];
                for (const key of Object.keys(strings)) {
                    // Skip values that are not marked for translation or simply do not exist
                    // because gradle does not like them
                    const untranslated = config.modResults.resources.string?.find(item =>
                        item.$.name === key && item.$.translatable !== false);
                    if (untranslated)
                        resources.push({ string: { $: { name: key }, _: strings[key] } });
                }
                if (resources.length) {
                    await fs.promises.mkdir(path.resolve(resPath, `values-${locale}`), { recursive: true });
                    await fs.promises.writeFile(
                        path.resolve(resPath, `values-${locale}`, 'strings.xml'),
                        builder.buildObject({ resources })
                    );
                }
            }
            return config;
        },
    );
};

module.exports = withAndroidLocalizedName;
