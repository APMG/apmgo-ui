// @flow

import { ActionType } from './defaults'
import type { PlaylistItemType } from './types'
import AudioPlayerState from '../models/AudioPlayerState'
import { RECEIVE_PLAYLIST_ITEMS, archivePlaylistItem } from './playlist'
import { put } from 'redux-saga/effects'

export const AUDIO_META_DATA_LOADED: string = 'bragi/audio-player/AUDIO_META_DATA_LOADED'
export const AUDIO_CAN_PLAY: string = 'bragi/audio-player/AUDIO_CAN_PLAY'
export const PLAY_CLICK: string = 'bragi/audio-player/PLAY_CLICK'
export const PAUSE_CLICK: string = 'bragi/audio-player/PAUSE_CLICK'
export const MUTE_CLICK: string = 'bragi/audio-player/MUTE_CLICK'
export const UNMUTE_CLICK: string = 'bragi/audio-player/UNMUTE_CLICK'
export const VOLUME_CHANGE: string = 'bragi/audio-player/VOLUME_CHANGE'
export const TIME_SCRUBBER_CHANGE: string = 'bragi/audio-player/TIME_SCRUBBER_CHANGE'
export const CHANGE_TRACK: string = 'bragi/audio-player/CHANGE_TRACK'
export const UPDATE_PLAYTIME: string = 'bragi/audio-player/UPDATE_PLAYTIME'
export const TRACK_ENDED: string = 'bragi/audio-player/TRACK_ENDED'

const defaultProps = {
  paused: true,
  muted: false,
  canPlay: false,
  volume: 0.5
}
const defaultPlayer = new AudioPlayerState(defaultProps)

export default function reducer (playerState: AudioPlayerState = defaultPlayer, action: ActionType = new ActionType()) {
  switch (action.type) {
    case AUDIO_META_DATA_LOADED:
      return playerState.setDuration(action.duration)

    case AUDIO_CAN_PLAY:
      let canPlayState = playerState
        .setCanPlay(true)

      return canPlayState.playWhenCan
        ? canPlayState.play()
        : canPlayState

    case PLAY_CLICK:
      return playerState.play()

    case PAUSE_CLICK:
      return playerState.pause()

    case MUTE_CLICK:
      return playerState.mute()

    case UNMUTE_CLICK:
      return playerState.unmute()

    case VOLUME_CHANGE:
      return playerState.setVolume(action.volume)

    case TIME_SCRUBBER_CHANGE:
      return playerState
        .setTime(action.currentTime)
        .setCanPlay(false)
        .instanceUpdatesAudioElementTime()

    case UPDATE_PLAYTIME:
      return playerState.setTime(action.currentTime)

    case CHANGE_TRACK:
      let newplayer = playerState
        .setCanPlay(false) // this will change when the audio element canplay event fires
        .setPlayWhenCan(!playerState.paused) // and if the player is currently playing, it will restart on canPlay
        .setCurrentTrackId(action.item.id)
        .setTime(action.item.attributes.playtime)
        .pause() // pause while loading new audio
        .instanceUpdatesAudioElementTime() // tell state that actual audio element needs to be updated
      return newplayer

    case RECEIVE_PLAYLIST_ITEMS:
      // we need to initialize the audio player here

      // first, try to default to the first unfinished track
      let first = action.data.find(item => !item.attributes.finished)

      // if that fails, just take the first track
      if (!first) {
        first = action.data[0]
      }

      // if there are no tracks, just return the player unmodified
      if (!first) {
        return playerState._make({})
      }

      // otherwise set the track
      return playerState.setCurrentTrackId(first.id).setTime(first.attributes.playtime)

    default:
      return playerState
  }
}

export function audioMetaDataLoaded (duration: number) {
  return {
    type: AUDIO_META_DATA_LOADED,
    duration: duration // so far this is the only param we need ...
  }
}

export function audioCanPlay () {
  return {
    type: AUDIO_CAN_PLAY
  }
}

export function playClick (itemId: number) {
  return {
    type: PLAY_CLICK,
    itemId: itemId
  }
}

export function pauseClick (itemId: number) {
  return {
    type: PAUSE_CLICK,
    itemId: itemId
  }
}

export function muteClick () {
  return {
    type: MUTE_CLICK
  }
}

export function unmuteClick () {
  return {
    type: UNMUTE_CLICK
  }
}

export function volumeChange (volume: number) {
  return {
    type: VOLUME_CHANGE,
    volume: volume
  }
}

export function timeScrubberChange (itemId: number, currentTime: number) {
  return {
    type: TIME_SCRUBBER_CHANGE,
    itemId: itemId,
    currentTime: currentTime
  }
}

export function updatePlayTime (itemId: number, currentTime: number) {
  return {
    type: UPDATE_PLAYTIME,
    itemId: itemId,
    currentTime: currentTime
  }
}

export function changeTrack (item: PlaylistItemType) {
  return {
    type: CHANGE_TRACK,
    item: item
  }
}

export function trackEnded (item: PlaylistItemType, next: PlaylistItemType) {
  return {
    type: TRACK_ENDED,
    item: item,
    next: next
  }
}

export function * trackEndedSaga (action: any): Generator<any, any, any> {
  yield put(changeTrack(action.next))
  yield put(archivePlaylistItem(action.item))
}
