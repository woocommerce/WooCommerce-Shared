#import "WCRNBridge.h"
#import "WCRNAnalyticsModule.h"

@interface WCRNBridge ()

@property(nonatomic, strong) NSURL* bundleURL;
@property(nonatomic, strong) id<WCRNAnalyticsProvider> analyticsProvider;

@end

@implementation WCRNBridge

-(instancetype)initWithBundleURL:(NSURL *)bundleURL analyticsProvider:(id<WCRNAnalyticsProvider>) analyticsProvider {
    if (self = [super init]) {
        self.bundleURL = bundleURL;
        self.analyticsProvider = analyticsProvider;
    }
    return self;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
    return self.bundleURL;
}

-(NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge {
    return @[
        [[WCRNAnalyticsModule alloc] initWithProvider: self.analyticsProvider]
    ];
}

@end
