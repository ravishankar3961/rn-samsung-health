import {NativeModules} from 'react-native'

const samsungHealth = NativeModules.RNSamsungHealth

const RNSamsungHealth = () => {
  const authorize = () => {
    const permissions = samsungHealth.getConstants()
    const permissionList = Object.values(permissions)

    if (Array.isArray(permissionList)) {
      return samsungHealth.connect(permissionList)
    } else {
      throw ' permissions is not array '
    }
  }

  const isAvailable = () => {
    return samsungHealth
      .isAvailable()
      .then(() => true)
      .catch(error => {
        if (error.message == 'Please install Samsung Health') {
          return false
        }

        return true
      })
  }

  const stop = () => {
    samsungHealth.disconnect()
  }

  const getDailyStepCount = options => {
    let startDate =
      options.startDate != undefined ? options.startDate : new Date().setHours(0, 0, 0, 0)
    let endDate = options.endDate != undefined ? options.endDate : new Date().valueOf()

    return samsungHealth.readDailyStepCount(startDate, endDate)
  }

  return {
    authorize,
    getDailyStepCount,
    isAvailable,
    stop,
  }
}

export default RNSamsungHealth()
