#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

/// Exit Native Module.
/// Needed to exit a react native view controller from the host app.
///
@interface WCRNExitModule : NSObject <RCTBridgeModule>

-(instancetype)initWithHost:(UIViewController *) hostViewController;

@end

NS_ASSUME_NONNULL_END
