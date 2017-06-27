// @flow
import { ActionType } from './defaults'
import type { PlaylistItemType } from './types'
import AudioPlayerState from '../models/AudioPlayerState'
import { RECEIVE_PLAYLIST_ITEMS } from './playlist'

export const PLAY_AUDIO_PLAYER: string = 'PLAY_AUDIO_PLAYER'
export const PLAY_TRACK: string = 'PLAY_TRACK'
export const PAUSE_AUDIO_PLAYER: string = 'PAUSE_AUDIO_PLAYER'
export const MUTE_AUDIO_PLAYER:  string = 'MUTE_AUDIO_PLAYER'
export const UNMUTE_AUDIO_PLAYER: string = 'UNMUTE_AUDIO_PLAYER'
export const SET_CURRENT_TRACK: string = 'SET_CURRENT_TRACK'
export const UPDATE_PLAYTIME: string = 'UPDATE_PLAYTIME'

const defaultProps = {
  paused: true,
  muted: false
}
const defaultPlayer = new AudioPlayerState(defaultProps)

export default function reducer(playerState : AudioPlayerState = defaultPlayer, action : ActionType = new ActionType) {

  switch(action.type) {

    case SET_CURRENT_TRACK:
      return playerState.setCurrentTrackId(action.item_id)

    case PLAY_TRACK:
      return playerState.setCurrentTrackId(action.item_id).play()

    case PLAY_AUDIO_PLAYER:
      return playerState.play()

    case PAUSE_AUDIO_PLAYER:
      return playerState.pause()

    case MUTE_AUDIO_PLAYER:
      return playerState.mute()

    case UNMUTE_AUDIO_PLAYER:
      return playerState.unmute()

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
        return playerState
      }

      // otherwise set the track
      return playerState.setCurrentTrackId(first.id)

    case UPDATE_PLAYTIME:
      return playerState.setTime(action.currentTime)

    default:
      return playerState
  }
}

export function setCurrentTrack(item_id: number) {
  return {
    type: SET_CURRENT_TRACK,
    item_id: item_id
  }
}

export function updatePlayTime(item_id: number, currentTime: number) {
  return {
    type: UPDATE_PLAYTIME,
    item_id: item_id,
    currentTime: currentTime
  }
}

export function playTrack(item_id: number) {
  return {
    type: PLAY_TRACK,
    item_id: item_id
  }
}

export function playAudioPlayer (item_id: number) {
  return {
    type: PLAY_AUDIO_PLAYER,
    item_id: item_id
  }
}

export function pauseAudioPlayer (item_id: number) {
  return {
    type: PAUSE_AUDIO_PLAYER,
    item_id: item_id
  }
}

export function muteAudioPlayer() {
  return { type: MUTE_AUDIO_PLAYER }
}

export function unmuteAudioPlayer() {
  return { type: UNMUTE_AUDIO_PLAYER }
}
