// @flow
import React from 'react'
import { PlaylistItemType } from '../../../redux/types'

type PlaylistItemDragPreviewProps = {
  item: PlaylistItemType,
  style: any
}

const PlaylistItemDragPreview = (props: PlaylistItemDragPreviewProps) => {
  return (
    <div style={props.style}>
      <h3>{props.item.attributes.audio_title}</h3>
      <p>{props.item.attributes.audio_description}</p>
    </div>
  )
}

export default PlaylistItemDragPreview
