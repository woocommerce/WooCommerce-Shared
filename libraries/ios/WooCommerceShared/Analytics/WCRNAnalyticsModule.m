#import "WCRNAnalyticsModule.h"
#import <React/RCTLog.h>

@interface WCRNAnalyticsModule ()

@property(nonatomic, strong) id<WCRNAnalyticsProvider> provider;

@end

@implementation WCRNAnalyticsModule

RCT_EXPORT_MODULE(MyReactNativeBridge);

-(instancetype)initWithProvider:(id<WCRNAnalyticsProvider>) provider {
    if (self = [super init]) {
        self.provider = provider;
    }
    return self;
}

RCT_EXPORT_METHOD(sendEvent:(NSString *)event) {
    [self.provider sendEvent:event];
}

@end
