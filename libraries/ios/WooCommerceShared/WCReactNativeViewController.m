#import "WCReactNativeViewController.h"
#import <React/React-Core-umbrella.h>
#import <React/RCTRootView.h>

@interface WCReactNativeViewController ()
@property(atomic, retain) NSURL* bundleUrl;
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

- (instancetype)initWithBundle:(NSURL *)url {
    if(self = [super init]) {
        self.bundleUrl = url;
    }

    return self;
}

- (void) loadView {
    self.view = [[RCTRootView alloc] initWithBundleURL: self.bundleUrl
                                            moduleName: @"main"
                                     initialProperties: [NSDictionary new]
                                         launchOptions: [NSDictionary new]
    ];
}

@end
