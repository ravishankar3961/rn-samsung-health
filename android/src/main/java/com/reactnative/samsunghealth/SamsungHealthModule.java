package com.reactnative.samsunghealth;

import android.util.Log;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.LifecycleEventListener;

import com.samsung.android.sdk.healthdata.HealthConstants;
import com.samsung.android.sdk.healthdata.HealthDataResolver;
import com.samsung.android.sdk.healthdata.HealthDataResolver.Filter;
import com.samsung.android.sdk.healthdata.HealthDataResolver.ReadRequest;
import com.samsung.android.sdk.healthdata.HealthDataService;
import com.samsung.android.sdk.healthdata.HealthDataStore;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by firodj on 5/2/17.
 */

@ReactModule(name = "RNSamsungHealth")
public class SamsungHealthModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private static final String REACT_MODULE = "RNSamsungHealth";
    private static final String DAY_TIME = "day_time";
    public static final String STEP_DAILY_TREND = "com.samsung.shealth.step_daily_trend";

    private HealthDataStore mStore;

    public SamsungHealthModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return REACT_MODULE;
    }

    @Override
    public void initialize() {
        super.initialize();

        getReactApplicationContext().addLifecycleEventListener(this);
        initSamsungHealth();
    }

    @Override
    public void onHostResume() {
    }

    @Override
    public void onHostPause() {
    }

    @Override
    public void onHostDestroy() {
    }

    public void initSamsungHealth() {
        Log.d(REACT_MODULE, "initialize Samsung Health");
        HealthDataService healthDataService = new HealthDataService();
        try {
            healthDataService.initialize(getReactApplicationContext());
        } catch (Exception e) {
            Log.e(REACT_MODULE, e.getClass().getName() + " - " + e.getMessage());
            Log.e(REACT_MODULE, "Failed to initialize.");
            e.printStackTrace();
        }
    }

    public HealthDataStore getStore() {
        return mStore;
    }

    public ReactContext getContext() {
        return getReactApplicationContext();
    }

    @ReactMethod
    public void connect(ReadableArray permissions, Promise mPromise) {
        ConnectionListener listener = new ConnectionListener(this, mPromise);
        for (int i = 0; i < permissions.size(); i++) {
            listener.addReadPermission(permissions.getString(i));
        }

        mStore = new HealthDataStore(getReactApplicationContext(), listener);
        mStore.connectService();
    }

    @ReactMethod
    public void isAvailable(Promise mPromise) {
        ConnectionListener listener = new ConnectionListener(this, mPromise);
        mStore = new HealthDataStore(getReactApplicationContext(), listener);
        mStore.connectService();
    }

    @Override
    @ReactMethod
    public Map<String, Object> getConstants() {
        Log.d(REACT_MODULE, "getConstants");
        final Map<String, Object> constants = new HashMap<>();
        constants.put("STEP_DAILY_TREND", SamsungHealthModule.STEP_DAILY_TREND);
        return constants;
    }

    @ReactMethod
    public void disconnect() {
        if (mStore != null) {
            Log.d(REACT_MODULE, "disconnect");
            mStore.disconnectService();
            mStore = null;
        }
    }

    @ReactMethod
    public void readDailyStepCount(double startDate, double endDate, Callback error, Callback success) {
        Log.d(REACT_MODULE, "readDailyStepCount");
        HealthDataResolver resolver = new HealthDataResolver(mStore, null);

        Filter filter = Filter.and(
            Filter.greaterThanEquals(SamsungHealthModule.DAY_TIME, (long)startDate),
            Filter.lessThanEquals(SamsungHealthModule.DAY_TIME, (long)endDate)
        );
        HealthDataResolver.ReadRequest request = new ReadRequest.Builder()
                .setDataType(SamsungHealthModule.STEP_DAILY_TREND)
                .setProperties(new String[] { 
                    HealthConstants.StepCount.COUNT, 
                    SamsungHealthModule.DAY_TIME,
                    HealthConstants.StepCount.DEVICE_UUID })
                .setFilter(filter)
                .build();

        try {
            resolver.read(request).setResultListener(new HealthDataResultListener(this, error, success));
        } catch (Exception e) {
            Log.e(REACT_MODULE, e.getClass().getName() + " - " + e.getMessage());
            Log.e(REACT_MODULE, "Getting step count fails.");
            error.invoke("Getting step count fails.");
        }

    }

}
