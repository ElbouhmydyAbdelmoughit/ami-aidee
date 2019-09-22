//
//  NotifierBridge.m
//  AMIaide
//
//  Created by favre on 08/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Notifier, NSObject)

RCT_EXTERN_METHOD(addNotification:(NSDictionary*) notification date:(NSDate*)date resolve:(RCTPromiseResolveBlock *)resolve reject:(RCTPromiseRejectBlock *)reject)

RCT_EXTERN_METHOD(authorization)

RCT_EXTERN_METHOD(removePendingNotification)
RCT_EXTERN_METHOD(removeDeliveredNotification)

@end
