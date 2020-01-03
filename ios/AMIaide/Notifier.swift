//
//  Notifier.swift
//  AMIaide
//
//  Created by favre on 08/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UserNotifications

@objc(Notifier)
class Notifier: NSObject {
  
  /**
   Always call this method before_notifications and before
    registering with the Apple Push Notification service. Typically, you call this
    method at launch time when configuring your app's notification support.
   */
  @objc(authorization)
  func authorization() {
    let notificationCenter = UNUserNotificationCenter.current()
    let options: UNAuthorizationOptions = [.alert, .sound, .badge]
    
    //Ask for authorization
    _RCTLogJavaScriptInternal(RCTLogLevel.info, "Notifier.requestAuthorization")
    
    notificationCenter.requestAuthorization(options: options) {
      (didAllow, error) in
      //completion(didAllow, error)
      if !didAllow {
        _RCTLogJavaScriptInternal(RCTLogLevel.info, "Notifier. User has declined notifications")
      } else {
        _RCTLogJavaScriptInternal(RCTLogLevel.info, "Notifier. User has authorized notifications")
      }
    }
  }
  
  func getStatus(notificationCenter: UNUserNotificationCenter, completion:@escaping ((UNAuthorizationStatus) -> Void)) {
    _RCTLogJavaScriptInternal(RCTLogLevel.info, "Notifier.getNotificationSettings")
    notificationCenter.getNotificationSettings { (settings) in
      completion(settings.authorizationStatus)
    }
  }
  
  @objc(removePendingNotification)
  func removePendingNotification() {
    let notificationCenter = UNUserNotificationCenter.current()
    notificationCenter.removeAllPendingNotificationRequests()
  }
  
  @objc(removeDeliveredNotification)
  func removeDeliveredNotification() {
    let notificationCenter = UNUserNotificationCenter.current()
    notificationCenter.removeAllDeliveredNotifications()
  }
  
  @objc(addNotification:date:resolve:reject:)
  func addNotification(notification: NSDictionary, date: NSDate, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    _RCTLogJavaScriptInternal(RCTLogLevel.info, "Notifier.addNotification")
    print(date)
    let notificationCenter = UNUserNotificationCenter.current()
    getStatus(notificationCenter: notificationCenter) { [weak self] status in
      switch status {
      case .authorized, .provisional:
        self?.prepareNotification(notificationCenter: notificationCenter, notification: notification, date: date) { error in
          if let error = error {
            reject("Notifier.addRequest", "failure", error)
          } else {
            resolve("authorized")
          }
        }
        
      case .denied:
        reject("Notifier.statusFailure", "denied", nil)
      case .notDetermined:
        reject("Notifier.statusFailure", "notDetermined", nil)
      }
    }
    
    //send notif
    
    // send notif repeat
    /*let date = Date(timeIntervalSinceNow: 3600)
    let triggerWeekly = Calendar.current.dateComponents([.weekday, .hour, .minute, .second,], from: date)
    let trigger = UNCalendarNotificationTrigger(dateMatching: triggerWeekly, repeats: true)*/
  }
  
  /**
   */
  func prepareNotification(notificationCenter: UNUserNotificationCenter, notification: NSDictionary, date: NSDate, completion: @escaping ((Error?) -> Void)) {
    let content = UNMutableNotificationContent.fromDictionary(dico: notification)
    let triggerDate = Calendar.current.dateComponents([.year,.month,.day,.hour,.minute,.second,], from: date as Date)
    
    let trigger = UNCalendarNotificationTrigger(dateMatching: triggerDate, repeats: false)
    
    let identifier = "Local Notification"
    let request = UNNotificationRequest(identifier: identifier, content: content, trigger: trigger)
    
    notificationCenter.add(request) { (error) in
      completion(error)
    }
  }
}

extension UNMutableNotificationContent {
  static func fromDictionary(dico: NSDictionary) -> UNMutableNotificationContent {
    let content = UNMutableNotificationContent()
    content.title = dico["title"] as? String ?? ""// "Bonjour"
    content.body = dico["body"] as? String ?? ""//"This is example how to create"
    content.sound = UNNotificationSound.default
    content.badge = 1
    return content
  }
}
