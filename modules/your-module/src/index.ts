import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'your-module' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const YourModule = NativeModules.YourModule
  ? NativeModules.YourModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
  );
    
export default {
  multiply(a: number, b: number): Promise<number> {
    return YourModule.multiply(a, b);
  }
};
