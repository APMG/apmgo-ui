// @flow

export interface PlaylistItemAttributes {
  // seems like the api sends us "after" but wants
  // to receive "after_id" e.g. in calls to update
  // until that gets sorted, we have them both
  after: number,
  after_id: number,
  audio_description: string,
  audio_hosts: string,
  audio_identifier: string,
  audio_image_url: string,
  audio_program: string,
  audio_publish_datetime: number,
  audio_title: string,
  audio_url: string,
  finished: null | string,
  origin_url: string,
  playtime: number,
  source: string,
  status: string
}

export interface PlaylistItemType {
  attributes: PlaylistItemAttributes,
  id: number,
  type: string
}
