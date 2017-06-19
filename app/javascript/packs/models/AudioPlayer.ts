import { AudioPlayerType } from '../redux/types'

export default class AudioPlayer implements AudioPlayerType {

  item_id: number
  paused: boolean

  constructor(item_id: number) {
    this.item_id = item_id
    this.paused = true;
  }
}