// @flow
import { ActionType, DefaultState } from './defaults';
import type { PlaylistItemType } from './types';
import AudioPlayerModel from '../models/AudioPlayerModel';

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
      return player.setTrack(action.item)

    case PLAY_AUDIO_PLAYER:
      return player.play()

    case PAUSE_AUDIO_PLAYER:
      return player.pause()

   case MUTE_AUDIO_PLAYER:
      return player.mute()

    case UNMUTE_AUDIO_PLAYER:
      return player.unmute()

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

export function playAudioPlayer () {
  return { type: PLAY_AUDIO_PLAYER }
}

export function pauseAudioPlayer () {
  return { type: PAUSE_AUDIO_PLAYER }
}

export function muteAudioPlayer() {
  return { type: MUTE_AUDIO_PLAYER }
}

export function unmuteAudioPlayer() {
  return { type: UNMUTE_AUDIO_PLAYER }
}
