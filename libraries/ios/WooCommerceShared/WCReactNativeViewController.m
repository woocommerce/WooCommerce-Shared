#import "WCReactNativeViewController.h"
#import <React/React-Core-umbrella.h>
#import <React/RCTRootView.h>
#import "WCRNAnalyticsProvider.h"
#import "WCRNBridge.h"

@interface WCReactNativeViewController ()
@property(atomic, strong) NSURL* bundleUrl;
@property(atomic, strong) NSString* blogId;
@property(atomic, strong) NSString* apiToken;
@property(atomic, strong) id<WCRNAnalyticsProvider> analyticsProvider;
@end

@implementation WCReactNativeViewController

- (instancetype) init {
    if (self = [super init]) {
        NSBundle *bundle = [NSBundle bundleForClass:[WCReactNativeViewController class]];

        if(bundle == nil) {
            NSException *exception = [NSException exceptionWithName: @"Invalid React Native Bundle" reason: @"Unable to determine the current bundle" userInfo: nil];
            [exception raise];

            return nil;
        }

        NSURL *url = [bundle URLForResource: @"bundle-ios" withExtension: @"js"];

        if(url == nil) {
            NSException *exception = [NSException exceptionWithName: @"Invalid React Native Bundle" reason: @"Unable to locate Javascript code" userInfo: nil];
            [exception raise];
            return nil;
        }

        self.bundleUrl = url;
    }

    return self;
}

-(instancetype)initWithAnalyticsProvider:(id<WCRNAnalyticsProvider>) analyticsProvider
                                  blogID:(NSString *)blogId
                                apiToken: (NSString*) apiToken {
    if (self = [self init]) {
        self.analyticsProvider = analyticsProvider;
        self.blogId =  blogId;
        self.apiToken = apiToken;
    }
    return self;

}

-(instancetype)initWithBundle:(NSURL *) url
            analyticsProvider:(id<WCRNAnalyticsProvider>) analyticsProvider
                       blogID:(NSString *)blogId
                     apiToken: (NSString*) apiToken {
    if (self = [super init]) {
        self.bundleUrl = url;
        self.analyticsProvider = analyticsProvider;
        self.blogId =  blogId;
        self.apiToken = apiToken;
    }
    return self;
}

- (void) loadView {
    NSDictionary * initialProps = @{@"blogId": self.blogId, @"token": self.apiToken};
    WCRNBridge * delegate = [[WCRNBridge alloc] initWithBundleURL:self.bundleUrl analyticsProvider:self.analyticsProvider];
    RCTBridge * bridge = [[RCTBridge alloc] initWithDelegate:delegate launchOptions:[NSDictionary new]];
    self.view = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"main" initialProperties:initialProps];
}

@end
