#import <React/RCTBridgeModule.h>
#import "WCRNAnalyticsProvider.h"

NS_ASSUME_NONNULL_BEGIN

/// Analytics Native Module.
/// Here we get the RN invocation and dispatch it to our analytics provider.
///
@interface WCRNAnalyticsModule : NSObject <RCTBridgeModule>

-(instancetype)initWithProvider:(id<WCRNAnalyticsProvider>) provider;

@end

NS_ASSUME_NONNULL_END
