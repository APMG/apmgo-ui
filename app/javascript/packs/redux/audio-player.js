// @flow
import { ActionType, DefaultState } from './defaults'
import type { PlaylistItemType } from './types'
import AudioPlayerModel from '../models/AudioPlayerModel'
import { RECEIVE_PLAYLIST_ITEMS } from './playlist'

export const PLAY_AUDIO_PLAYER: string = 'PLAY_AUDIO_PLAYER'
export const PAUSE_AUDIO_PLAYER: string = 'PAUSE_AUDIO_PLAYER'
export const MUTE_AUDIO_PLAYER:  string = 'MUTE_AUDIO_PLAYER'
export const UNMUTE_AUDIO_PLAYER: string = 'UNMUTE_AUDIO_PLAYER'
export const SET_CURRENT_TRACK: string = 'SET_CURRENT_TRACK'

const defaultProps = {
  paused: true,
  muted: false
}
const defaultPlayer = new AudioPlayerModel(defaultProps)

export default function reducer(player : AudioPlayerModel = defaultPlayer, action : ActionType = new ActionType) {

  switch(action.type) {

    case SET_CURRENT_TRACK:
      return player.setCurrentTrackId(action.item_id)

    case PLAY_AUDIO_PLAYER:
      return player.play()

    case PAUSE_AUDIO_PLAYER:
      return player.pause()

    case MUTE_AUDIO_PLAYER:
      return player.mute()

    case UNMUTE_AUDIO_PLAYER:
      return player.unmute()

    case RECEIVE_PLAYLIST_ITEMS:
      // we need to initialize the audio player here

      // first, try to default to the first unfinished track
      let first = action.data.find(item => item.attributes.finished !== true);

      // if that fails, just take the first track
      if (!first) {
        first = action.data[0]
      }

      // if there are no tracks, just return the player unmodified
      if (!first) {
        return player
      }

      // otherwise set the track
      return player.setCurrentTrackId(first.id)

    default:
      return player
  }
}

export function setCurrentTrack(item_id: number) {
  return {
    type: SET_CURRENT_TRACK,
    item_id: item_id
  }
}

export function playAudioPlayer (item_id: number) {
  return { type: PLAY_AUDIO_PLAYER }
}

export function pauseAudioPlayer (item_id: number) {
  return { type: PAUSE_AUDIO_PLAYER }
}

export function muteAudioPlayer() {
  return { type: MUTE_AUDIO_PLAYER }
}

export function unmuteAudioPlayer() {
  return { type: UNMUTE_AUDIO_PLAYER }
}
