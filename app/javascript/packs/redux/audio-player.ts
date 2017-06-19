import { ActionType, DefaultState } from './defaults';
import { PlaylistItemType } from './types';
import AudioPlayer from '../models/AudioPlayer';

export const PLAY_AUDIO_PLAYER = 'PLAY_AUDIO_PLAYER'
export const PAUSE_AUDIO_PLAYER = 'PAUSE_AUDIO_PLAYER'

export default function reducer(state : Array<AudioPlayer> = [], action : ActionType = new ActionType) {

  switch(action.type) {

    case PLAY_AUDIO_PLAYER:
      // append the new player if it doesn't already exist
      if (!state.find(player => player.item_id === action.item_id)) {
        state.push(new AudioPlayer(action.item_id))
      }

      return state.map(player => {
          // play the item being played and pause all the others
          player.paused = player.item_id != action.item_id
          return player
      })

    case PAUSE_AUDIO_PLAYER: 
      return state.map(player => {
        if (player.item_id === action.item_id) {
          player.paused = true
        }
          return player
      })

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