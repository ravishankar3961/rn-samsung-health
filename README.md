## rn-samsung-health

React Native module to read data from Samsung Health application on Android device, using samsung health Android SDK.

## Prerequisite

You need Samsung app certification to access all health data provided by Samsung Health application. You can apply for Samsung partner apps for your react-native application. For more details please visit [Samsung Health Android SDK](https://developer.samsung.com/health/android).

### Developer Mode on Samsung Health app

For development purpose you can enable the developer mode on Samsung Health app:

1. Open Samsung Health application
1. Go to > Settings > About Samsung Health
1. Tap 10 times on the app version `Version XX.XX`.

The name of the version will be changed to `*(Developer Mode)* XXXX Version XX.XX` and you'll be able to access S Health data.

## Installation

`yarn add -E https://github.com/elsaapp/rn-samsung-health`

## Getting started

- Add the following to your `react-native.config.js`

```js
module.exports = {
  dependencies: {
    'rn-samsung-health': {
      platforms: {
        android: {
          packageInstance: 'new SamsungHealthPackage(BuildConfig.APPLICATION_ID)',
        },
      },
    },
  },
}
```

- Add permissions in `android/app/src/main/AndroidManifest.xml`:

```xml
        <application
        <meta-data
          android:name="com.samsung.android.health.permission.read"
          android:value="com.samsung.health.step_count;com.samsung.shealth.step_daily_trend;" />
```

## Usage

```js
import RNSamsungHealth from 'rn-samsung-health'

RNSamsungHealth.isAvailable()
  .then(isAvailable => {
    if (isAvailable) {
      return RNSamsungHealth.authorize().then(res => {
        const startDate = new Date().setDate(new Date().getDate() - 30) // 30 days back date
        const endDate = new Date().valueOf()
        const options = {startDate, endDate}
        return RNSamsungHealth.getDailyStepCount(options).then(console.log)
      })
    }
  })
  .catch(console.error)
```

## Kudos

https://github.com/mango33sg/react-native-samsung-health for writing the original version
https://github.com/GaneshSinghPapola/rn-samsung-health for updating the lib a bit
https://github.com/kliuiev/rn-samsung-health for making the lib Promise based
https://github.com/fstefanello/rn-samsung-health for creating the isAvailable function
