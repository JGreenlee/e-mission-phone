
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNYourModuleSpec.h"

@interface YourModule : NSObject <NativeYourModuleSpec>
#else
#import <React/RCTBridgeModule.h>

@interface YourModule : NSObject <RCTBridgeModule>
#endif

@end
