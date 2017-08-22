import { PlaylistItemType } from './types'
import AudioPlayerState from '../models/AudioPlayerState'

export class ActionType {
  type: string = 'DEFAULT'
  data: Array<{}> = []
  receivedAt: Number
  item_id : number
  message: string
  item: PlaylistItemType
}
