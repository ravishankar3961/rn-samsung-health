import { NativeModules, DeviceEventEmitter } from "react-native";

const samsungHealth = NativeModules.RNSamsungHealth;

// Version 1.0.0

class RNSamsungHealth {
  async authorize() {

    const permissions = samsungHealth.getConstants();

    const permission = [];

    for (const item in permissions) {
      permission.push(permissions[item]);
    }

    if (Array.isArray(permission)) {
      return samsungHealth.connect(permission);
    }
    throw "permissions is not array ";
  }

  isAvailable(callback) {
    return new Promise((resolve, reject) => {
      samsungHealth
        .isAvailable()
        .then((succ) => callback(null, true))
        .catch((err) => {
          if (err.message == "Please install Samsung Health")
            return callback(err.message, false);
          callback(err.message, true);
        });
    });
  }

  stop() {
    samsungHealth.disconnect();
  }

  getCalories(options) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readCalories(
        startDate,
        endDate,
        (msg) => reject(msg),
        (res) => resolve(res)
      );
    });
  }

  getStepCountDailies(options) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readStepCountDailies(
        startDate,
        endDate,
        (msg) => reject(msg, false),
        (res) => resolve(res)
      );
    });
  }

  getStepCountSamples(options) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readStepCountSamples(
        startDate,
        endDate,
        (msg) => reject(msg, false),
        (res) => resolve(res)
      );
    });
  }

  getWeight(options) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readWeight(
        startDate,
        endDate,
        (msg) => reject(msg),
        (res) => resolve(res)
      );
    });
  }

  getSleep(options) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readSleep(
        startDate,
        endDate,
        (msg) => reject(msg),
        (res) => resolve(res)
      );
    });
  }

  getHeartRate(options) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readHeartRate(
        startDate,
        endDate,
        (msg) => reject(msg),
        (res) => resolve(res)
      );
    });
  }

  getExercise(options) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readExercise(
        startDate,
        endDate,
        (msg) => reject(msg),
        (res) => resolve(res)
      );
    });
  }

  getFloorsClimbed(options) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readFloorsClimbed(
        startDate,
        endDate,
        (msg) => reject(msg),
        (res) => resolve(res)
      );
    });
  }

  getBodyTemprature(options) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readBodyTemprature(
        startDate,
        endDate,
        (msg) => reject(msg),
        (res) => resolve(res)
      );
    });
  }

  getBloodPressure(options) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readBloodPressure(
        startDate,
        endDate,
        (msg) => reject(msg),
        (res) => resolve(res)
      );
    });
  }

  getHeight(options) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readHeight(
        startDate,
        endDate,
        (msg) => reject(msg),
        (res) => resolve(res)
      );
    });
  }

  getWaterIntake(options) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readWaterIntake(
        startDate,
        endDate,
        (msg) => reject(msg),
        (res) => resolve(res)
      );
    });
  }

  getNutrition(options) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readNutrition(
        startDate,
        endDate,
        (msg) => reject(msg),
        (res) => resolve(res)
      );
    });
  }

  getCholesterol(options, callback) {
    const startDate =
      options.startDate != undefined
        ? options.startDate
        : new Date().setHours(0, 0, 0, 0);
    const endDate =
      options.endDate != undefined ? options.endDate : new Date().valueOf();

    return new Promise((resolve, reject) => {
      samsungHealth.readCholesterol(
        startDate,
        endDate,
        (msg) => reject(msg),
        (res) => resolve(res)
      );
    });
  }

  usubscribeListeners() {
    DeviceEventEmitter.removeAllListeners();
  }

  mergeResult(res) {
    results = {};
    for (const dev of res) {
      if (!(dev.sourceDetail.group in results)) {
        results[dev.sourceDetail.group] = {
          source: dev.source,
          sourceDetail: { group: dev.sourceDetail.group },
          stepsDate: {},
        };
      }

      const group = results[dev.sourceDetail.group];

      for (const step of dev.steps) {
        if (!(step.date in group.stepsDate)) {
          group.stepsDate[step.date] = 0;
        }

        group.stepsDate[step.date] += step.value;
      }
    }

    results2 = [];
    for (const index in results) {
      const group = results[index];
      const steps = [];
      for (const date in group.stepsDate) {
        steps.push({
          date,
          value: group.stepsDate[date],
        });
      }
      group.steps = steps.sort((a, b) => (a.date < b.date ? -1 : 1));
      delete group.stepsDate;

      results2.push(group);
    }

    return results2;
  }
}

export default new RNSamsungHealth();