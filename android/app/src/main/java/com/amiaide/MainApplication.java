package com.amiaide;

import android.app.Application;

import androidx.multidex.MultiDexApplication;

import com.amiaide.videoView.VideoViewPackage;
import com.crashlytics.android.Crashlytics;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.zoontek.rnlocalize.RNLocalizePackage;
import com.robinpowered.react.battery.DeviceBatteryPackage;
import com.ninty.system.setting.SystemSettingPackage;

import com.github.yamill.orientation.OrientationPackage;
import com.syan.agora.AgoraPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import io.fabric.sdk.android.Fabric;
import java.util.List;


public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
       packages.add(new NotifierPackage());
       packages.add(new VideoViewPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
