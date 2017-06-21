// @flow
import AudioPlayerModel from '../models/AudioPlayerModel'

export type PlaylistItemType = {
  attributes: {
    after: string,
    "audio-description": string,
    "audio-hosts": string,
    "audio-identifier": string,
    "audio-program": string,
    "audio-title": string,
    "audio-url": string,
    "finished": null | string,
    "origin-url": string,
    "playtime": number,
    "source": string,
    "status": string
  },
  id: number,
  type: string
}
