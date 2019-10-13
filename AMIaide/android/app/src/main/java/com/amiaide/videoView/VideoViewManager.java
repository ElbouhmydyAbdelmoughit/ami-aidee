package com.amiaide.videoView;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class VideoViewManager extends SimpleViewManager<VideoView> {

    public static final String REACT_CLASS = "RCTVideoView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Nonnull
    @Override
    public VideoView createViewInstance(ThemedReactContext context) {
        return new VideoView(context, null);
    }

    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        "onReadyEvent",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onReady")))
                .put(
                        "onLoadStartEvent",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onLoadStart")))
                .put(
                        "onErrorEvent",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onError")))
                .build();
    }


    @ReactProp(name = "volume")
    public void setVolume(HgLVideoTrimmer view, @Nullable float value) {
        view.setVolume(value);
    }

    @ReactProp(name = "replay")
    public void setReplay(HgLVideoTrimmer view, @Nullable Boolean replay) {
        if (replay) {
            view.replay();
        }
    }


    @ReactProp(name = "urlPath")
    public void setSrc(HgLVideoTrimmer view, @Nullable String url) {
        if (url == null || url.isEmpty()) {
            return;
        }
        view.setVideoURI(url);
        //view.setMaxDuration(10);
    }
}
