import { PlaylistItemType, AudioPlayerType } from './types'

export class DefaultState {
  data: Array<PlaylistItemType> = []
  audioPlayers: Array<AudioPlayerType> = []
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