// @flow

type AudioPlayerStateParams = {
  currentTrackId?: number,
  paused?: boolean,
  muted?: boolean,
  currentTime?: number
}

export default class AudioPlayerState {
  currentTrackId: number | typeof undefined
  paused: boolean
  muted: boolean
  currentTime: number

  constructor(params: AudioPlayerStateParams) {

    this.currentTrackId = params.currentTrackId
    this.paused = !!params.paused
    this.muted = !!params.muted
    this.currentTime = params.currentTime || 0
  }

  setCurrentTrackId(track: number) {
    return this._make({
      currentTrackId: track
     })
  }

  setTime(time: number) {
    return this._make({currentTime: time})
  }

  play(currentTrackId?: number) {
    let params : {paused: boolean, currentTrackId?: number} = { paused: false }

    if (currentTrackId) {
      params.currentTrackId = currentTrackId
    }

    return this._make(params)
  }

  pause() {
    return this._make({paused: true})
  }

  mute() {
    return this._make({muted: true})
  }

  unmute() {
    return this._make({muted: false})
  }

  _make(params: {}) : AudioPlayerState {
    let newParams = {
      currentTrackId: this.currentTrackId,
      paused: this.paused,
      muted: this.muted,
      currentTime: this.currentTime,
      ...params
    }
    return new AudioPlayerState(newParams)
  }
}
