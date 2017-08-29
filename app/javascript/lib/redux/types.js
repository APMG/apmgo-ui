// @flow
import AudioPlayerState from '../models/AudioPlayerState'

export interface PlaylistItemType {
  attributes: PlaylistItemAttributes,
  id: number,
  type: string
}

export interface PlaylistItemAttributes {
  after: string,
  audio_description: string,
  audio_hosts: string,
  audio_identifier: string,
  audio_program: string,
  audio_title: string,
  audio_url: string,
  finished: null | string,
  origin_url: string,
  playtime: number,
  source: string,
  status: string
}

export const DraggableItemTypes = {
  PLAYLIST_ITEM: 'playlistItem'
}
