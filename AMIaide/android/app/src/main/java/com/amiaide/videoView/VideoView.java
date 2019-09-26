package com.amiaide.videoView;

import android.content.Context;
import android.util.AttributeSet;

import androidx.annotation.NonNull;

/**
 * TODO: document your custom view class.
 */
public class VideoView extends HgLVideoTrimmer {

    public VideoView(@NonNull Context context, AttributeSet attrs) {
        super(context, attrs);
        //this.setOnTrimVideoListener(this);
    }

    public VideoView(@NonNull Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        //this.setOnTrimVideoListener(this);
    }


/*

    @Override
    public void onTrimStarted() {
        WritableMap event = Arguments.createMap();
        event.putString("message", "trim started");
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "trimStarted",
                event);
    }

    @Override
    public void getResult(Uri uri) {
        WritableMap event = Arguments.createMap();
        event.putString("url", "file://" + uri.toString());
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "exportFinished",
                event);
    }

    @Override
    public void onChangedSeekBar() {

        /*int left = mStartPosition;//mRangeSeekBarView.getThumbValue(0);
        int right = mEndPosition;//mRangeSeekBarView.getThumbValue(1);
        int current = mHolderTopView.getProgress();

        WritableMap event = Arguments.createMap();
        event.putInt("min", left);
        event.putInt("max", right);
        event.putInt("current", current);
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "valueChanged",
                event);*/
    /*}

    @Override
    public void cancelAction() {
        WritableMap event = Arguments.createMap();
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "cancelAction",
                event);
    }

    @Override
    public void onError(String message) {

    }
*/
}
