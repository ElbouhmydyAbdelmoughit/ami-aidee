# AMI Aidee

[![Build status](https://build.appcenter.ms/v0.1/apps/c9c0fa1e-dab0-46b1-a810-f0f993c537bc/branches/dev/badge)](https://appcenter.ms)

## Requirements


- [Android Studio](https://developer.android.com/studio/index.html) : Android Dev Environment
- [Xcode](https://developer.apple.com/xcode/), [CocoaPods](https://cocoapods.org/) : iOS Dev Environment
- [Node](https://nodejs.org/en/download/): version 12 or newer

For more detailed information: [Setup React Native development environment](https://reactnative.dev/docs/environment-setup)

## Installation

Clone the repo and install packages.
```shell
$ git clone git@github.com:ami-app/aidee.git
$ cd aidee
$ npm install
```

## Run on Android 

Launch Android emulator or connect an Android device 
- [Launch Android emulator](https://developer.android.com/studio/run/emulator#runningemulator)
- [Connect a real Android device](https://developer.android.com/studio/run/device#setting-up)

Run Android project
```sh
$ cd aidee
$ npx react-native run-android
```

### Run on iOS
Install pods dependencies
```sh
$ cd ios && pod install
```
Run IOS Project
```
$ cd .. && npx react-native run-ios
```


### Troubleshooting

##### For Mac M1 pod install will cause build failure. In the terminal:

```
sudo arch -x86_64 gem install ffi
arch -x86_64 pod install
``` 