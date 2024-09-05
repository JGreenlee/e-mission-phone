import { Platform } from 'react-native';
import { osName, osVersion } from 'expo-device';
import { DOMParser } from 'react-native-html-parser';
import { mockLogger } from '../__mocks__/globalMocks';
import {
  mockBEMDataCollection,
  mockBEMServerCom,
  mockBEMUserCache,
  mockDevice,
  mockGetAppVersion,
} from '../__mocks__/cordovaMocks';

// TODO uncomment once native modules are available

// import nativeUnifiedLogger from 'em-unified-logger/src/index';
// import nativeUserCache from 'em-usercache/src/index';
// import nativeConnectionSettings from 'em-connection-settings/src/index';
// import nativeServerCom from 'em-servercomm/src/index';
// import nativeDataCollection from 'em-data-collection/src/index';
// import nativeOpcodeAuth from 'em-opcodeauth/src/index';

// osName is only defined in Expo environments; false in Cordova
export const IS_EXPO = osName != undefined;

export function setupExpoCompat() {
  if (IS_EXPO) {
    // fill in a few browser APIs that are missing in the Expo environment
    global.DOMParser = DOMParser;

    // now we need to handle the cordova plugins
    if (Platform.OS == 'web') {
      // if on Expo Web, use mocks for the plugins to enable testing in the browser
      mockLogger();
      mockDevice();
      mockGetAppVersion();
      mockBEMUserCache();
      mockBEMServerCom();
      mockBEMDataCollection();
    }

    // TODO uncomment once we have the native modules

    // else if (Platform.OS == 'android') {
    //   /* if on Expo android, hook the native modules onto the window object
    //     (so they can be used as if they were the Cordova plugins) */
    //   window['Logger'] = nativeUnifiedLogger;
    //   window['device'] = {
    //     platform: osName,
    //     version: osVersion,
    //   };
    //   window['cordova'] = {
    //     platformId: osName?.toLowerCase(),
    //     getAppVersion: {
    //       getVersionNumber: () => Promise.resolve('1.0.0'),
    //     },
    //     plugins: {
    //       BEMUserCache: nativeUserCache,
    //       BEMConnectionSettings: nativeConnectionSettings,

    //       // for some reason the BEMServerComm cordova plugin doesn't use promises and only does callbacks.
    //       // to get the Expo module to act like the Cordova plugin, we need to wrap the calls in a
    //       // callback-based wrapper
    //       BEMServerComm: {
    //         pushGetJSON: (relativeURL: string, messageFiller: any, rs, rj) =>
    //           nativeServerCom.pushGetJSON(relativeURL, messageFiller).then(rs).catch(rj),
    //         postUserPersonalData: (
    //           relativeUrl: string,
    //           objectLabel: string,
    //           objectJSON: any,
    //           rs,
    //           rj,
    //         ) =>
    //           nativeServerCom
    //             .postUserPersonalData(relativeUrl, objectLabel, objectJSON)
    //             .then(rs)
    //             .catch(rj),
    //         getUserPersonalData: (relativeUrl: string, rs, rj) =>
    //           nativeServerCom.getUserPersonalData(relativeUrl).then(rs).catch(rj),
    //       },
    //       BEMDataCollection: nativeDataCollection,
    //       OPCodeAuth: nativeOpcodeAuth,
    //     },
    //   };
    // } else {
    //   // Expo iOS is TODO
    // }
  }
}
