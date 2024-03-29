#import "WCReactNativeViewController.h"
#import <React/React-Core-umbrella.h>
#import <React/RCTRootView.h>
#import "WCRNAnalyticsProvider.h"
#import "WCRNBridge.h"

@interface WCReactNativeViewController ()
@property(atomic, strong) NSURL* bundleUrl;
@property(atomic, strong) NSString* blogId;
@property(atomic, strong) NSString* apiToken;
@property(atomic, strong) NSString* siteUrl;
@property(atomic, strong) NSString* appPassword;
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

-(instancetype)initWithAnalyticsProvider:(id<WCRNAnalyticsProvider>) analyticsProvider
                                 siteUrl:(NSString *)siteUrl
                             appPassword: (NSString*) appPassword {
    if (self = [self init]) {
        self.analyticsProvider = analyticsProvider;
        self.siteUrl = siteUrl;
        self.appPassword = appPassword;
    }
    return self;
}

-(instancetype)initWithBundle:(NSURL *) url
            analyticsProvider:(id<WCRNAnalyticsProvider>) analyticsProvider {
    if (self = [super init]) {
        self.bundleUrl = url;
        self.analyticsProvider = analyticsProvider;
    }
    return self;
}

- (void) loadView {
    NSDictionary * initialProps = @{@"blogId": self.blogId ?: [NSNull null],
                                    @"token": self.apiToken ?: [NSNull null],
                                    @"siteUrl": self.siteUrl ?: [NSNull null],
                                    @"appPassword": self.appPassword ?: [NSNull null]};
    WCRNBridge * delegate = [[WCRNBridge alloc] initWithBundleURL:self.bundleUrl
                                                analyticsProvider:self.analyticsProvider
                                                   hostController:self];
    RCTBridge * bridge = [[RCTBridge alloc] initWithDelegate:delegate launchOptions:[NSDictionary new]];
    self.view = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"main" initialProperties:initialProps];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:true];
    [self.navigationController setNavigationBarHidden:true];
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:true];
    [self.navigationController setNavigationBarHidden:false];
}

@end
