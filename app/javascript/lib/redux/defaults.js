// @flow
import { PlaylistItemType } from './types'

export class ActionType {
  type: string = 'DEFAULT'
  data: Array<PlaylistItemType> = []
  item: PlaylistItemType
  itemId: number
  receivedAt: Number
  message: string
  from: number
  to: number
  currentTime: number
  duration: number
  volume: number
  next: PlaylistItemType
}
