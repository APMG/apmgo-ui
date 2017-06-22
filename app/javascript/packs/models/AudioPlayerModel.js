// @flow

import type { PlaylistItemType } from '../redux/types'

type AudioPlayerModelParams = {
  // item_id: number,
  currentTrackId?: number,
  paused?: boolean,
  muted?: boolean
}

export default class AudioPlayerModel {
  currentTrackId: number | typeof undefined
  paused: boolean
  muted: boolean

  constructor(params: AudioPlayerModelParams) {

    this.currentTrackId = params.currentTrackId
    this.paused = !!params.paused
    this.muted = !!params.muted
  }

  setCurrentTrackId(track: number) {
    return this._make({
      currentTrackId: track
     })
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

  _make(params: {}) : AudioPlayerModel {
    let newParams = {
      currentTrackId: this.currentTrackId,
      paused: this.paused,
      muted: this.muted,
      ...params
    }
    return new AudioPlayerModel(newParams)
  }
}
