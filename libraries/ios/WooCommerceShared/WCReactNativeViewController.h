#import <UIKit/UIKit.h>
#import "WCRNAnalyticsProvider.h"

NS_ASSUME_NONNULL_BEGIN

@interface WCReactNativeViewController : UIViewController
-(instancetype)init;
-(instancetype)initWithBundle:(NSURL *) url
            analyticsProvider:(id<WCRNAnalyticsProvider>) analyticsProvider
                       blogID:(NSString *)blogId
                     apiToken: (NSString*) apiToken;
@end

NS_ASSUME_NONNULL_END
