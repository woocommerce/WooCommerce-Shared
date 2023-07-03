#import <React/RCTBridgeDelegate.h>
#import "WCRNAnalyticsProvider.h"

NS_ASSUME_NONNULL_BEGIN

/// Custom bridge. Needed to inject the Analytics Native module with injected Analytics provider.
///
@interface WCRNBridge : NSObject<RCTBridgeDelegate>

-(instancetype)initWithBundleURL:(NSURL *)bundleURL analyticsProvider:(id<WCRNAnalyticsProvider>) analyticsProvider;

@end

NS_ASSUME_NONNULL_END
