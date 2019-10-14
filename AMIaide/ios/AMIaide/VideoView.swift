//
//  VideoView.swift
//  AMIaide
//
//  Created by favre on 06/10/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit
import AVFoundation

@objc(VideoView)
public class VideoView: UIView {
  
  var observer: NSKeyValueObservation?
  var onLoadStart: RCTBubblingEventBlock?
  var onReady: RCTBubblingEventBlock?
  
  @objc(instanceFromNib)
  public static func instanceFromNib() -> VideoView {
    return UINib(nibName: "VideoView", bundle: nil).instantiate(withOwner: nil, options: nil)[0] as! VideoView
  }
  
  override public class var layerClass: AnyClass {
    return AVPlayerLayer.self
  }
  
  private let queuePlayer = AVPlayer()
  
  var playerLayer: AVPlayerLayer {
    return layer as! AVPlayerLayer
  }
  
  var player: AVPlayer? {
    get {
      return playerLayer.player
    }
    set {
      playerLayer.player = newValue
    }
  }
  
  @objc(setOnLoadStart:)
  public func setOnLoadStart(event: @escaping RCTBubblingEventBlock) {
    self.onLoadStart = event
  }
  
  @objc(setOnReady:)
  public func setOnReady(event: @escaping RCTBubblingEventBlock) {
    self.onReady = event
  }
  
  @objc(initializePlayer)
  public func initializePlayer() {
    player = queuePlayer
    queuePlayer.volume = 1.0
  }
  
  
  public func setToPlayer(url: URL) {
    self.observer?.invalidate()
    //start loading
    self.onLoadStart?([:])
    let asset = AVURLAsset(url: url)
   // let item = AVPlayerItem(asset: asset)
    
    let assetKeys = [
      "playable",
      "hasProtectedContent"
    ]
    // Create a new AVPlayerItem with the asset and an
    // array of asset keys to be automatically loaded
    let playerItem = AVPlayerItem(asset: asset,
                                  automaticallyLoadedAssetKeys: assetKeys)
    
    // Register as an observer of the player item's status property
    self.observer = playerItem.observe(\.status, options:  [.new, .old], changeHandler: { (playerItem, change) in
      if playerItem.status == .readyToPlay {
        //Do your work here
        self.onReady?([:])
      }
    })
    
    queuePlayer.replaceCurrentItem(with: playerItem)
    
    //is ready
    queuePlayer.seek(to: CMTime.zero)
    queuePlayer.play()
  }
  
  @objc(replay)
  public func replay() {
    queuePlayer.seek(to: CMTime.zero)
    queuePlayer.play()
  }
  
  @objc(setVolume:)
  public func setVolume(value: Float) {
    queuePlayer.volume = value
  }
  
  @objc(setToPlayer:)
  public func setToPlayer(stringURL: String) {
    if let url = URL.init(string: stringURL) {
      setToPlayer(url: url)
    }
  }
}

