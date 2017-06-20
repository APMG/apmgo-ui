import { ActionType, DefaultState } from './defaults';
import { PlaylistItemType } from './types';
import AudioPlayerModel from '../models/AudioPlayerModel';

export const PLAY_AUDIO_PLAYER: string = 'PLAY_AUDIO_PLAYER'
export const PAUSE_AUDIO_PLAYER: string = 'PAUSE_AUDIO_PLAYER'

export default function reducer(state : Array<AudioPlayerModel> = [], action : ActionType = new ActionType) {

  switch(action.type) {

    case PLAY_AUDIO_PLAYER:
      // append the new player if it doesn't already exist
      if (!state.find(player => player.item_id === action.item_id)) {
        state.push(new AudioPlayerModel({item_id: action.item_id}))
      }

      return state.map((player: AudioPlayerModel) => {
          // play the item being played and pause all the others
          let paused = player.item_id != action.item_id
          return player.setPaused(paused)
      })

    case PAUSE_AUDIO_PLAYER:
      let newState = state.map((player: AudioPlayerModel )=> {
        if (player.item_id === action.item_id) {
          let pausedPlayer = player.setPaused(true)
          return pausedPlayer
        }
        return player
      })
      return newState

    default:
      return state
  }
}

export function playAudioPlayer (item_id) {
  return {
    type: PLAY_AUDIO_PLAYER,
    item_id: item_id
  }
}

export function pauseAudioPlayer (item_id) {
  return {
    type: PAUSE_AUDIO_PLAYER,
    item_id: item_id
  }
}
