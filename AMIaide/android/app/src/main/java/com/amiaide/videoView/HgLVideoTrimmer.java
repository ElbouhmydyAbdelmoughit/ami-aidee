/*
 * MIT License
 *
 * Copyright (c) 2016 Knowledge, education for life.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package com.amiaide.videoView;

import android.content.Context;
import android.database.Cursor;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.VideoView;

import com.amiaide.R;

import java.io.File;
import java.io.IOException;

import androidx.annotation.NonNull;

public class HgLVideoTrimmer extends FrameLayout /*implements TrimVideoView.VideoViewListener*/ {

    private static final String TAG = HgLVideoTrimmer.class.getSimpleName();
    private static final int MIN_TIME_FRAME = 1000;
    private static final int SHOW_PROGRESS = 2;

    public float rangeMin = 0;
    public float rangeMax = 5;
    private RelativeLayout mLinearVideo;
    private View mTimeInfoContainer;
   private TrimVideoView mVideoView;
    private ImageView mPlayView;

    private String mSrc;
    private String mFinalPath;
    private String title = "";

    private int mMaxDuration;
    private int mMinDuration;

    private int mDuration = 0;
    private int mTimeVideo = 0;
    public int mStartPosition = 0;
    public int mEndPosition = 0;

    private long mOriginSizeFile;
    private boolean mResetSeekBar = true;
    //private final MessageHandler mMessageHandler = new MessageHandler(this);

    private boolean isSetup = false;

    public HgLVideoTrimmer(@NonNull Context context, AttributeSet attrs) {

        this(context, attrs, 0);
    }

    public HgLVideoTrimmer(@NonNull Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }


    public void setVolume(float value) {
        mVideoView.setVolumeModifier(value);
    }

    public void replay() {
        mVideoView.start();
        mVideoView.setPausedModifier(true);
        mVideoView.seekTo(0);
        mVideoView.setPausedModifier(false);
    }

    private void init(Context context) {
        LayoutInflater.from(context).inflate(R.layout.view_time_line, this, true);

        mVideoView = ((TrimVideoView)findViewById(R.id.video_view));



        /*if (URLUtil.isNetworkUrl(parsedUrl.toString())) {

            mVideoView.setSrc(parsedUrl.toString(), "mp4", true, false, null);
        } else {
            mVideoView.setSrc(parsedUrl.toString(), "mp4", false, true, null);
        }*/
        //mVideoView.setSrc(urlString, "mp4", true, false, null);

        //mVideoView.setSrc("", "", true, false);
        /*try {
            Log.e("Get Data Count ", " its here ");

            CookieManager cookieManager = CookieManager.getInstance();

           Uri parsedUrl = Uri.parse(urlString);
            Uri.Builder builtUrl = parsedUrl.buildUpon();

            String cookie = cookieManager.getCookie(builtUrl.build().toString());

            Map<String, String> headers = new HashMap<String, String>();

            if (cookie != null) {
                headers.put("Cookie", cookie);
            }

            //if (mRequestHeaders != null) {
            //  headers.putAll(toStringMap(mRequestHeaders));
            //}

            mVideoView.setDataSource(context, parsedUrl, headers);
            mVideoView.setVolume(0, 0);
            mVideoView.setLooping(true);
            mVideoView.prepare(new MediaPlayer.OnPreparedListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    mVideoView.start();
                }
            });
        } catch (IOException ioe) {
            //ignore
            Log.e("Get Data Count ", String.valueOf(ioe));
        }*/
       /* mHolderTopView = ((SeekBar) findViewById(R.id.handlerTop));
        mVideoProgressIndicator = ((ProgressBarView) findViewById(R.id.timeVideoView));
        mRangeSeekBarView = ((RangeSeekBarView) findViewById(R.id.timeLineBar));
        mLinearVideo = ((RelativeLayout) findViewById(R.id.layout_surface_view));
        mVideoView = ((TrimVideoView) findViewById(R.id.video_loader));
        mPlayView = ((ImageView) findViewById(R.id.icon_video_play));
        mTimeInfoContainer = findViewById(R.id.timeText);
        mTextSize = ((TextView) findViewById(R.id.textSize));
        mTextTimeFrame = ((TextView) findViewById(R.id.textTimeSelection));
        mTextTime = ((TextView) findViewById(R.id.textTime));
        mTimeLineView = ((TimeLineView) findViewById(R.id.timeLineView));
        mTitleTextView = ((TextView) findViewById(R.id.title_text_view));
        setUpListeners();
        setUpMargins();*/

       // mVideoView.listener = this;
        ViewTreeObserver viewTreeObserver = this.getViewTreeObserver();
        final HgLVideoTrimmer view = this;
        viewTreeObserver.addOnPreDrawListener(new ViewTreeObserver.OnPreDrawListener() {
            @Override
            public boolean onPreDraw() {
                if (view.getMeasuredWidth() <= 0) { return false; }
                view.getViewTreeObserver().removeOnPreDrawListener(this);
                int width = view.getMeasuredWidth();
                int height = view.getMeasuredHeight();

                //Do something with width and height here!
                //view.setupVideo();

                return true;
            }
        });
        this.isSetup = true;

       // this.mTitleTextView.setText(this.title);
    }

    /*public void setTitle(String str) {
        this.title = str;

      //  if (this.mTitleTextView != null) {
            this.mTitleTextView.setText(str);
        }
    }

    public void setupVideo() {
        if (URLUtil.isNetworkUrl(mSrc.toString())) {

            mVideoView.setSrc(mSrc.toString(), "mp4", true, false, null);
        } else {
            mVideoView.setSrc(mSrc.toString(), "mp4", false, true, null);
        }
        mVideoView.requestFocus();

        mTimeLineView.setVideo(mSrc);
    }*/
/*
    private void setUpListeners() {
        mListeners = new ArrayList<>();
        mListeners.add(new OnProgressVideoListener() {
            @Override
            public void updateProgress(int time, int max, float scale) {
                updateVideoProgress(time);
            }
        });
        mListeners.add(mVideoProgressIndicator);

        findViewById(R.id.back_btn)
                .setOnClickListener(
                new OnClickListener() {
                    @RequiresApi(api = Build.VERSION_CODES.GINGERBREAD_MR1)
                    @Override
                    public void onClick(View view) {
                        onCancelClicked();
                    }
                }
        );

        findViewById(R.id.btSave)
                .setOnClickListener(
                        new OnClickListener() {
                            @RequiresApi(api = Build.VERSION_CODES.GINGERBREAD_MR1)
                            @Override
                            public void onClick(View view) {
                                try {
                                    onSaveClicked();
                                } catch (IOException e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                );

        final GestureDetector gestureDetector = new
                GestureDetector(getContext(),
                new GestureDetector.SimpleOnGestureListener() {
                    @Override
                    public boolean onSingleTapConfirmed(MotionEvent e) {
                        onClickVideoPlayPause();
                        return true;
                    }
                }
        );

        mVideoView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, @NonNull MotionEvent event) {
                gestureDetector.onTouchEvent(event);
                return true;
            }
        });

        mRangeSeekBarView.addOnRangeSeekBarListener(mVideoProgressIndicator);
        mRangeSeekBarView.addOnRangeSeekBarListener(new OnRangeSeekBarListener() {
            @Override
            public void onCreate(RangeSeekBarView rangeSeekBarView, int index, float value) {

            }

            @Override
            public void onSeek(RangeSeekBarView rangeSeekBarView, int index, float value) {
                onSeekThumbs(index, value);
                mOnTrimVideoListener.onChangedSeekBar();
            }

            @Override
            public void onSeekStart(RangeSeekBarView rangeSeekBarView, int index, float value) {

            }

            @Override
            public void onSeekStop(RangeSeekBarView rangeSeekBarView, int index, float value) {
                onStopSeekThumbs();
            }
        });


        mHolderTopView.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                onPlayerIndicatorSeekChanged(progress, fromUser);
                mOnTrimVideoListener.onChangedSeekBar();
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
                onPlayerIndicatorSeekStart();
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                onPlayerIndicatorSeekStop(seekBar);
            }
        });

        mHolderTopView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                return false;
            }
        });
    }*/
/*
    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN)
    private void setUpMargins() {
        int marge = mRangeSeekBarView.getThumbs().get(0).getWidthBitmap();
        int widthSeek = mHolderTopView.getThumb().getMinimumWidth() / 2;

        RelativeLayout.LayoutParams lp = (RelativeLayout.LayoutParams) mHolderTopView.getLayoutParams();
        lp.setMargins(marge - widthSeek, 0, marge - widthSeek, 0);
        mHolderTopView.setLayoutParams(lp);

        lp = (RelativeLayout.LayoutParams) mTimeLineView.getLayoutParams();
        lp.setMargins(marge, 0, marge, 0);
        mTimeLineView.setLayoutParams(lp);

        lp = (RelativeLayout.LayoutParams) mVideoProgressIndicator.getLayoutParams();
        lp.setMargins(marge, 0, marge, 0);
        mVideoProgressIndicator.setLayoutParams(lp);
    }*/

    /*@RequiresApi(api = Build.VERSION_CODES.GINGERBREAD_MR1)
    private void onSaveClicked() throws IOException {
        if (mStartPosition <= 0 && mEndPosition >= mDuration) {
            if (mOnTrimVideoListener != null)
                mOnTrimVideoListener.getResult(mSrc);
        } else {
            mPlayView.setVisibility(View.VISIBLE);
            mVideoView.setPausedModifier(true);

            if (mOnTrimVideoListener != null)
                mOnTrimVideoListener.onTrimStarted();

            BackgroundExecutor.execute(
                    new BackgroundExecutor.Task("", 0L, "") {
                        @Override
                        public void execute() {
                            MediaMetadataRetriever mediaMetadataRetriever = new MediaMetadataRetriever();
                            if (URLUtil.isNetworkUrl(mSrc.toString())) {
                                mediaMetadataRetriever.setDataSource(mSrc.toString(), new HashMap<String,String>());
                            } else {
                                mediaMetadataRetriever.setDataSource(getContext(), mSrc);
                            }

                            long METADATA_KEY_DURATION = Long.parseLong(mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION));


                            final Uri videoURI = mSrc;
                            final Context context = getContext();
                            try {

                                final File file = File.createTempFile("test", ".mp4");
                                if (android.os.Build.VERSION.SDK_INT > 9) {
                                    StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
                                    StrictMode.setThreadPolicy(policy);
                                }
                                InputStream in =  URLUtil.isNetworkUrl(mSrc.toString()) ? new URL(mSrc.toString()).openStream() : context.getContentResolver().openInputStream(videoURI);
                                OutputStream out = null;

                                out = new FileOutputStream(file);

                                byte[] buf = new byte[1024];
                                int len;
                                while((len=in.read(buf))>0){
                                    out.write(buf,0,len);
                                }
                                out.close();
                                in.close();


                            if (mTimeVideo < MIN_TIME_FRAME) {

                                if ((METADATA_KEY_DURATION - mEndPosition) > (MIN_TIME_FRAME - mTimeVideo)) {
                                    mEndPosition += (MIN_TIME_FRAME - mTimeVideo);
                                } else if (mStartPosition > (MIN_TIME_FRAME - mTimeVideo)) {
                                    mStartPosition -= (MIN_TIME_FRAME - mTimeVideo);
                                }
                            }

                                if (file != null)
                                    TrimVideoUtils.startTrim(file, file.getParent(), mStartPosition, mEndPosition, mOnTrimVideoListener);
                            } catch (final Throwable e) {
                                Thread.getDefaultUncaughtExceptionHandler().uncaughtException(Thread.currentThread(), e);
                            }
                        }
                    }
            );
        }
    }*/



    public String getPath(Uri uri)
    {
        String[] projection = { MediaStore.Images.Media.DATA };
        Cursor cursor = this.getContext().getContentResolver().query(uri, projection, null, null, null);
        if (cursor == null) return null;
        int column_index =             cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        String s=cursor.getString(column_index);
        cursor.close();
        return s;
    }
/*
    private void onClickVideoPlayPause() {
        if (mVideoView.isPlaying()) {
            mPlayView.setVisibility(View.VISIBLE);
            mVideoView.setPausedModifier(true);
        } else {
            mPlayView.setVisibility(View.GONE);

            if (mResetSeekBar) {
                mResetSeekBar = false;
                mVideoView.seekTo(mStartPosition);
            }
            mVideoView.setPausedModifier(false);
        }
    }

    private void onCancelClicked() {
        mVideoView.stop();
        if (mOnTrimVideoListener != null) {
            mOnTrimVideoListener.cancelAction();
        }
    }*/

    private String getDestinationPath() {
        if (mFinalPath == null) {
            File folder = Environment.getExternalStorageDirectory();
            mFinalPath = folder.getAbsolutePath() + File.separator;
            Log.d(TAG, "Using default path " + mFinalPath);
        }
        return mFinalPath;
    }

    private void onPlayerIndicatorSeekChanged(int progress, boolean fromUser) {

        int duration = progress;//(int) ((mDuration * progress) / 100L);
        float startPercent = mStartPosition * 100 / mDuration;
        float endPercent = mEndPosition * 100 / mDuration;

        if (duration < startPercent) {
            setProgressBarPosition((int) startPercent);
            duration = (int) startPercent;
        } else if (duration > endPercent) {
            setProgressBarPosition((int) endPercent);
            duration = (int) endPercent;
        }
    }
/*
    private void onPlayerIndicatorSeekStart() {
        mVideoView.setPausedModifier(true);
        mPlayView.setVisibility(View.VISIBLE);
        notifyProgressUpdate(false);
    }

    private void onPlayerIndicatorSeekStop(@NonNull SeekBar seekBar) {
        mVideoView.setPausedModifier(true);
        mPlayView.setVisibility(View.VISIBLE);

        int progress = seekBar.getProgress();
        int duration = (int) ((mDuration * progress) / 100L);
        mVideoView.seekTo(duration);
        notifyProgressUpdate(false);
    }*/
/*
    private void onVideoPrepared() {
        // Adjust the size of the video
        // so it fits on the screen

        int videoWidth = mVideoView.getVideoWidth();
        int videoHeight = mVideoView.getVideoHeight();
        float videoProportion = (float) videoWidth / (float) videoHeight;
        int screenWidth = mLinearVideo.getWidth();
        int screenHeight = mLinearVideo.getHeight();
        float screenProportion = (float) screenWidth / (float) screenHeight;
        ViewGroup.LayoutParams lp = mVideoView.getLayoutParams();

        if (videoProportion > screenProportion) {
            lp.width = screenWidth;
            lp.height = (int) ((float) screenWidth / videoProportion);
        } else {
            lp.width = (int) (videoProportion * (float) screenHeight);
            lp.height = screenHeight;
        }
        mVideoView.setLayoutParams(lp);

        mPlayView.setVisibility(View.VISIBLE);

        mDuration = mVideoView.getDuration();

        mEndPosition = mDuration;
        mStartPosition = 0;
        setSeekBarPosition();

        if (mOnHgLVideoListener != null) {
            mOnHgLVideoListener.onVideoPrepared();
        }
    }*/

    private void setSeekBarPosition() {

        if (mDuration <= mMinDuration || mMinDuration < 0) {
            mMinDuration = 1;
        }
        if (mMaxDuration < mMinDuration) {
            mMaxDuration = mMinDuration + 1;
        }
        if (mDuration < mMaxDuration) {
            mMaxDuration = mDuration;
        }

        mStartPosition = mMinDuration;// mDuration / 2 - mMinDuration / 2;
        mEndPosition = mMaxDuration;//mDuration / 2 + mMaxDuration / 2;
        float startPercent = mStartPosition * 100 / mDuration;
        float endPercent = mEndPosition * 100 / mDuration;

        if (mDuration >= mMaxDuration) {
         //   mRangeSeekBarView.setThumbValue(0, startPercent);
          //  mRangeSeekBarView.setThumbValue(1, endPercent);

        }
        else {
            mStartPosition = mMinDuration;//0;
            mEndPosition = mDuration;
        }


        setProgressBarPosition((int) startPercent);
        //mVideoView.seekTo(mStartPosition);

        mTimeVideo = mDuration;
        //mRangeSeekBarView.initMaxWidth();
        //mRangeSeekBarView.initMinWidth();
    }
/*
    private void onSeekThumbs(int index, float percentValue) {
        float value = percentValue * mDuration / 100;
        switch (index) {
            case Thumb.LEFT: {
                mStartPosition = (int) value;
                mVideoView.seekTo(mStartPosition);
                break;
            }
            case Thumb.RIGHT: {
                mEndPosition = (int) value;
                mVideoView.seekTo(mEndPosition);
                break;
            }
        }
        mTimeVideo = mEndPosition - mStartPosition;
    }*/

    private void onStopSeekThumbs() {
       //mVideoView.setPausedModifier(true);
        mPlayView.setVisibility(View.VISIBLE);
    }

    private void onVideoCompleted() {
     //   mVideoView.seekTo(mStartPosition);
    }
/*
    private void notifyProgressUpdate(boolean all) {
        if (mDuration == 0) return;

        int position = mVideoView.getCurrentPosition();
        if (all) {
            for (OnProgressVideoListener item : mListeners) {
                item.updateProgress(position, mDuration, ((position * 100) / mDuration));
            }
        } else {
            mListeners.get(1).updateProgress(position, mDuration, ((position * 100) / mDuration));
        }
    }

    private void updateVideoProgress(int time) {
        if (mVideoView == null) {
            return;
        }

        if (time >= mEndPosition) {
           // mMessageHandler.removeMessages(SHOW_PROGRESS);
            mVideoView.setPausedModifier(true);
            mPlayView.setVisibility(View.VISIBLE);
            mResetSeekBar = true;
            return;
        }

        if (mHolderTopView != null) {
            // use long to avoid overflow
            //setProgressBarPosition(time * 100 / mDuration);
        }
    }*/

    private void setProgressBarPosition(int position) {
        if (mDuration > 0) {
            //long pos = 1000L * position / mDuration;
         //   mHolderTopView.setProgress(position);
        }
    }

    /**
     * Set video information visibility.
     * For now this is for debugging
     *
     * @param visible whether or not the videoInformation will be visible
     */
    public void setVideoInformationVisibility(boolean visible) {
        mTimeInfoContainer.setVisibility(visible ? VISIBLE : GONE);
    }

    /**
     * Listener for events such as trimming operation success and cancel
     *
     * @param onTrimVideoListener interface for events
     */
    @SuppressWarnings("unused")
  /*  public void setOnTrimVideoListener(OnTrimVideoListener onTrimVideoListener) {
        mOnTrimVideoListener = onTrimVideoListener;
    }
*/
    /**
     * Listener for some {@link VideoView} events
     *
     * @param onHgLVideoListener interface for events
     */
    //@SuppressWarnings("unused")
    /*public void setOnHgLVideoListener(OnHgLVideoListener onHgLVideoListener) {
        mOnHgLVideoListener = onHgLVideoListener;
    }*/

    /**
     * Sets the path where the trimmed video will be saved
     * Ex: /storage/emulated/0/MyAppFolder/
     *
     * @param finalPath the full path
     */
    //@SuppressWarnings("unused")
    public void setDestinationPath(final String finalPath) {
        mFinalPath = finalPath;
        Log.d(TAG, "Setting custom path " + mFinalPath);
    }

    /**
     * Cancel all current operations
     */
    public void destroy() {
     //   BackgroundExecutor.cancelAll("", true);
     //   UiThreadExecutor.cancelAll("");
    }

    /**
     * Set the maximum duration of the trimmed video.
     * The trimmer interface wont allow the user to set duration longer than maxDuration
     *
     * @param maxDuration the maximum duration of the trimmed video in seconds
     */
    @SuppressWarnings("unused")
    public void setMaxDuration(int maxDuration) {
        mMaxDuration = maxDuration * 1000;
        //mMaxDuration = maxDuration;
    }

    /**
     * Set the minimum duration of the trimmed video.
     * The trimmer interface wont allow the user to set duration longer than minDuration
     *
     * @param minDuration the minimum duration of the trimmed video in seconds
     */
    @SuppressWarnings("unused")
    public void setMinDuration(int minDuration) {
        mMinDuration = minDuration * 1000;
        //mMaxDuration = maxDuration;
    }

    /**
     * Sets the uri of the video to be trimmer
     *
     * @param videoURI Uri of the video
     */
    @SuppressWarnings("unused")
    public void setVideoURI(final String videoURI) {

        if (videoURI.isEmpty()) {
            return;
        }
        mSrc = videoURI;

        String urlString = mSrc;//"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";
        //"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

        Uri parsedUrl = Uri.parse(urlString);
        try {
            mVideoView.setDataSource(urlString);
            mVideoView.setLooping(false);

            mVideoView.prepareAsync(new MediaPlayer.OnPreparedListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    mVideoView.start();
                }


            });
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * TrimVideoView LISTENER
     */
/*
    @Override
    public void onLoadStart() {
        Log.d("TEST", "ON LOAD START");
    }

    @Override
    public void onPrepared(double duration) {
        Log.d("TEST", "ON VIDEO PREPARED: " + duration);
        this.onVideoPrepared();



    }

    @Override
    public void onError() {
        mOnTrimVideoListener.onError("MediaPlayer.Unknown.Error");
    }

    @Override
    public void onSeek(double currentPos, double seekTime) {
        //Log.d("TEST", "ON SEEK. currentPos: " + currentPos + " | seekTIME: " + seekTime);
        //mOnTrimVideoListener.onChangedSeekBar();
        updateVideoProgress((int) currentPos);
        //int value = (int) (currentPos * 100 / mDuration);
        //setProgressBarPosition(value);
    }*/
/*
    @Override
    public void onInfo(int what) {
        //Log.d("TEST", "ON INFO: State: " + what);
    }

    private static class MessageHandler extends Handler {

        @NonNull
        private final WeakReference<HgLVideoTrimmer> mView;

        MessageHandler(HgLVideoTrimmer view) {
            mView = new WeakReference<>(view);
        }

        @Override
        public void handleMessage(Message msg) {
            HgLVideoTrimmer view = mView.get();
            if (view == null || view.mVideoView == null) {
                return;
            }

            view.notifyProgressUpdate(true);
            if (view.mVideoView.isPlaying()) {
                sendEmptyMessageDelayed(0, 10);
            }
        }
    }*/
}

