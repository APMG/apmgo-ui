// @flow
type AudioPlayerStateParams = {
  currentTrackId?: number,
  paused?: boolean,
  muted?: boolean,
  currentTime?: number,
  updateAudioElementTime?: boolean, // only present when explicitly set, signals need to update the time on the audio element
  canPlay?: boolean,
  volume?: number,
  duration?: number,
  isDragging?: boolean,
  playWhenCan?: boolean
}

export default class AudioPlayerState {
  currentTrackId: number | typeof undefined
  paused: boolean
  muted: boolean
  currentTime: number
  updateAudioElementTime: boolean
  canPlay: boolean
  volume: number
  duration: number
  isDragging: boolean
  playWhenCan: boolean

  constructor (params: AudioPlayerStateParams) {
    this.currentTrackId = params.currentTrackId
    this.paused = !!params.paused
    this.muted = !!params.muted
    this.currentTime = params.currentTime || 0
    this.updateAudioElementTime = params.updateAudioElementTime || false
    this.canPlay = params.canPlay || false
    this.duration = params.duration || 0
    this.isDragging = params.isDragging || false
    this.playWhenCan = params.playWhenCan || false

    if (params.volume === 0) {
      this.volume = 0
    } else {
      this.volume = params.volume || 1
    }
  }

  setCurrentTrackId (track: number) {
    return this._make({
      currentTrackId: track
    })
  }

  setTime (time: number) {
    return this._make({currentTime: time})
  }

  // If chaining AudioPlayerState updates,
  // this method must be called last
  // or it will be overwritten
  // because its value is not preserved in _make({})
  instanceUpdatesAudioElementTime () {
    return this._make({updateAudioElementTime: true})
  }

  setCanPlay (canPlay: boolean) {
    return this._make({canPlay: canPlay})
  }

  play (currentTrackId?: number) {
    currentTrackId = currentTrackId || this.currentTrackId

    return this._make({
      paused: false,
      currentTrackId: currentTrackId
    })
  }

  pause () {
    return this._make({paused: true})
  }

  mute () {
    return this._make({muted: true})
  }

  unmute () {
    return this._make({muted: false})
  }

  setVolume (volume: number) {
    return this._make({volume: volume})
  }

  setDuration (duration: number) {
    return this._make({duration: duration})
  }

  setPlayWhenCan (playWhenCan: boolean) {
    return this._make({playWhenCan: playWhenCan})
  }

  _make (params: {}): AudioPlayerState {
    let newParams = {
      currentTrackId: this.currentTrackId,
      paused: this.paused,
      muted: this.muted,
      currentTime: this.currentTime,
      canPlay: this.canPlay,
      volume: this.volume,
      duration: this.duration,
      isDragging: this.isDragging,
      playWhenCan: this.playWhenCan,
      // note doUpdateTime is not here by default,
      // it must be set explicitly, meaning that if
      // methods are chained, it will be overwritten
      // if instanceUpdatesAudioElementTime() is not called last
      ...params
    }

    return new AudioPlayerState(newParams)
  }
}
