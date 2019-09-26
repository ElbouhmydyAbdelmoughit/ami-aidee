package com.amiaide;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentSender;
import android.os.SystemClock;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.Calendar;
import java.util.Date;
import java.util.Dictionary;
import java.util.Locale;

import javax.annotation.Nonnull;

import androidx.core.app.NotificationCompat;

import static android.content.Context.ALARM_SERVICE;

public class NotifierModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public static final String NOTIFICATION_CHANNEL_ID = "10001";
    private final static String default_notification_channel_id = "default";


    NotifierModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Nonnull
    @Override
    public String getName() {
        return "Notifier";
    }

    @ReactMethod
    public void authorization(Promise promise) {
        promise.resolve(true);
    }

    @ReactMethod
    public void addNotification(ReadableMap value, Double date, Promise promise) {

        Calendar test = Calendar.getInstance(Locale.FRANCE);

        test.setTimeInMillis(date.longValue());
        Date d = test.getTime();

        Notification notif = this.getNotification(
                value.getString("title"),
                value.getString("body"));

        this.scheduleNotification(notif, date.longValue());

        promise.resolve(null);
    }


    private void scheduleNotification(Notification notification, long timeInMillis) {
        Intent notificationIntent = new Intent(reactContext, MyNotificationPublisher.class);
        notificationIntent.putExtra(MyNotificationPublisher.NOTIFICATION_ID, 1);
        notificationIntent.putExtra(MyNotificationPublisher.NOTIFICATION, notification);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(reactContext, 0, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);



        AlarmManager alarmManager = (AlarmManager) reactContext.getSystemService(Context.ALARM_SERVICE);
        assert alarmManager != null;
        alarmManager.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, timeInMillis, pendingIntent);
    }

    private Notification getNotification(String title, String content) {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(reactContext, default_notification_channel_id);
        builder.setContentTitle(title);
        builder.setContentText(content);
        builder.setSmallIcon(R.drawable.redbox_top_border_background);
        builder.setAutoCancel(true);

        builder.setChannelId(NOTIFICATION_CHANNEL_ID);
        return builder.build();

    }
}
