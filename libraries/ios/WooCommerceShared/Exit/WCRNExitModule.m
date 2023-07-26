#import "WCRNExitModule.h"
#import <React/RCTLog.h>
#import <UIKit/UIKit.h>

@interface WCRNExitModule ()

@property(nonatomic, weak) UIViewController * hostViewController;

@end

@implementation WCRNExitModule

RCT_EXPORT_MODULE(ExitModule);

-(instancetype)initWithHost:(UIViewController *) hostViewController {
    if ([super init]) {
        self.hostViewController = hostViewController;
    }
    return self;
}

RCT_EXPORT_METHOD(exit) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (self.hostViewController.navigationController != nil) {
            [self.hostViewController.navigationController popViewControllerAnimated: true];
            return;
        }

        [self.hostViewController dismissViewControllerAnimated:true completion:nil];
    });
}

@end
