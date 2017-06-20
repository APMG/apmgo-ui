import { AudioPlayerType } from '../redux/types'

class AudioPlayerModelParams {

}

export default class AudioPlayerModel implements AudioPlayerType {

  item_id: number
  paused: boolean
  currentTime: number

  constructor(params: {
    item_id: number
    paused?: boolean
    currentTime?: number
  }) {
    this.item_id = params.item_id
    this.paused = !!params.paused
    this.currentTime = params.currentTime || 0
  }

  toggledPaused() {
    return this._make({paused: !this.paused})
  }

  setPaused(paused: Boolean) : AudioPlayerModel {
    return this._make({paused: this.paused})
  }

  // static fromAudioEl(item_id, audioEl: HTMLAudioElement) {
  //   let instance = new AudioPlayerModel(item_id)

  //   instance.paused = audioEl.paused
  //   instance.currentTime = audioEl.currentTime

  //   return instance
  // }

  _thisProps() {
    let result = {}
    Object.keys(this).forEach(key => {
      result[key]= this[key]
    })
    console.log(result)
    return result
  }

  private _make(params: {}) : AudioPlayerModel {
    let newParams = {
      item_id: this.item_id,
      ...this._thisProps(),
      params
    }
    debugger
    return new AudioPlayerModel(newParams)
  }
}