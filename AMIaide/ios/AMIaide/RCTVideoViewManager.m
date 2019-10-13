//
//  RCTVideoViewManager.m
//  AMIaide
//
//  Created by favre on 06/10/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>

#import "AMIaide-Swift.h"

@interface RCTVideoViewManager : RCTViewManager
@end

@implementation RCTVideoViewManager

RCT_EXPORT_MODULE(RCTVideoView)

- (UIView *)view
{
  VideoView* view = [VideoView instanceFromNib];
  [view initializePlayer];
  return view;
}
/*
 urlPath={uri}
 replay={replay}
 volume={volume}
 */

RCT_EXPORT_VIEW_PROPERTY(onLoadStart, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onReady, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY(urlPath, NSString, VideoView) {
  NSString* url = [RCTConvert NSString:json];
  if (url != nil) {
    [view setToPlayer: url];
  }
}

RCT_CUSTOM_VIEW_PROPERTY(replay, BOOL, VideoView) {
  BOOL isReplay = [RCTConvert BOOL:json];
  if (isReplay) {
    [view replay];
  }
}


RCT_CUSTOM_VIEW_PROPERTY(volume, double, VideoView) {
  double value = [RCTConvert double:json ];
  [view setVolume: value];
}

@end
