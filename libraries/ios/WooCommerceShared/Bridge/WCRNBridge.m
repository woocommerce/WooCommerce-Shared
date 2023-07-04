#import "WCRNBridge.h"
#import "WCRNAnalyticsModule.h"
#import "WCRNExitModule.h"

@interface WCRNBridge ()

@property(nonatomic, strong) NSURL* bundleURL;
@property(nonatomic, strong) id<WCRNAnalyticsProvider> analyticsProvider;
@property(nonatomic, weak) UIViewController * hostController;

@end

@implementation WCRNBridge

-(instancetype)initWithBundleURL:(NSURL *)bundleURL
               analyticsProvider:(id<WCRNAnalyticsProvider>) analyticsProvider
                  hostController:(UIViewController *) hostController {
    if (self = [super init]) {
        self.bundleURL = bundleURL;
        self.analyticsProvider = analyticsProvider;
        self.hostController = hostController;
    }
    return self;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
    return self.bundleURL;
}

-(NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge {
    return @[
        [[WCRNAnalyticsModule alloc] initWithProvider: self.analyticsProvider],
        [[WCRNExitModule alloc] initWithHost:self.hostController]
    ];
}

@end
