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
  
  @objc(initializePlayer)
  public func initializePlayer() {
    player = queuePlayer
    queuePlayer.volume = 1.0
  }
  
  
  public func setToPlayer(url: URL) {
    let asset = AVURLAsset(url: url)
    let item = AVPlayerItem(asset: asset)
    
    queuePlayer.replaceCurrentItem(with: item)
    
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

