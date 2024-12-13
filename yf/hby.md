getTimezoneDateInfo(targetTimezone) {
      if (typeof targetTimezone === 'undefined') {
        const targetDate = new Date()
        return {
          targetTimezoneMillisecond: targetDate.getTime(),
          targetTimezoneDate: targetDate
        }
      }
      // 返回协调世界时（UTC）相对于当前时区的时间差值，单位为分钟
      // 需要注意的是如果本地时区后于协调世界时，则该差值为正值，如果先于协调世界时则为负值。例如你所在时区为 UTC+10（澳大利亚东部标准时间），将会返回 -600。
      const timezoneOffset = new Date().getTimezoneOffset()
      console.log('timezoneOffset--', timezoneOffset)
      const timezoneOffsetTime = timezoneOffset * 60 * 1000
      // 获取世界协调世界时（UTC）时区的时间的毫秒值
      const utcMillisecond = new Date().getTime() + timezoneOffsetTime
      // 获取世界协调世界时（UTC）时区时间的日期对象实例
      const utcDate = new Date(utcMillisecond)
      console.log('utcDate--', utcDate)

      // 根据时区，对时间戳进行加减运算，获得对应时区的时间戳
      const targetTimezoneMillisecond = utcMillisecond + targetTimezone * 60 * 60 * 1000
      const targetTimezoneDate = new Date(targetTimezoneMillisecond)

      return {
        targetTimezoneMillisecond,
        targetTimezoneDate
      }
    }