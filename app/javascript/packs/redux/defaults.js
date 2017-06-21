import { PlaylistItemType } from './types'
import AudioPlayerModel from '../models/AudioPlayerModel'

export class DefaultState {
  data: Array<PlaylistItemType> = []
  audioPlayers: Array<AudioPlayerModel> = []
  errorMessage: string = ''
}

export class ActionType {
  type: string = 'DEFAULT'
  data: Array<{}> = []
  receivedAt: Number
  item_id : number
  message: string
  item: PlaylistItemType
}
