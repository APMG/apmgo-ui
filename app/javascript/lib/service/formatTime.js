// @flow

export function toFormatted (timeInSeconds: number) {
  timeInSeconds = Math.round(timeInSeconds)

  let formattedTime = ''
  let formattedMinutes = ''
  let formattedSeconds = ''
  let hours = Math.floor(timeInSeconds / 3600)
  let minutes = Math.floor((timeInSeconds / 60) - (hours * 60))
  let seconds = timeInSeconds - (minutes * 60) - (hours * 3600)

  if (hours !== 0) {
    formattedTime = hours + ':'

    if (minutes < 10) {
      formattedMinutes = '0' + minutes
    } else {
      formattedMinutes = minutes.toString()
    }
  } else {
    formattedMinutes = minutes.toString()
  }

  if (seconds < 10) {
    formattedSeconds = '0' + seconds
  } else {
    formattedSeconds = seconds.toString()
  }

  formattedTime = formattedTime + formattedMinutes + ':' + formattedSeconds

  return formattedTime
}

export function toSeconds (formattedTime: string) {
  var arrHms = formattedTime.split(':')
  var arrSmh = arrHms.reverse()
  var timeInSeconds = 0
  var seconds = parseInt(arrSmh[0] || 0)
  var minutes = parseInt(arrSmh[1] * 60 || 0)
  var hours = parseInt(arrSmh[2] * 3600 || 0)

  timeInSeconds = hours + minutes + seconds

  return timeInSeconds
}
