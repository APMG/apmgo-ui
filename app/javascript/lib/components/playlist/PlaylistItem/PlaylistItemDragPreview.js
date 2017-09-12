// @flow
import React from 'react'
import { PlaylistItemType } from '../../../redux/types'

import './PlaylistItem.scss'

type PlaylistItemDragPreviewProps = {
  item: PlaylistItemType,
  style: any
}

const PlaylistItemDragPreview = (props: PlaylistItemDragPreviewProps) => {
  return (
    <li style={props.style}>
      <div styleName="tile-drag">
        <div styleName="img" style={{backgroundImage: 'url(//via.placeholder.com/300x200/123456/ffffff?text=Any+size+img)'}} />
        <div styleName="content">
          <div styleName="published">Published ■■■■■■ ■■, ■■■■</div>
          <div styleName="title">
            <h2 className="hdg hdg-2">{props.item.attributes.audio_title}</h2>
          </div>
          <div styleName="origin">
            <img styleName="origin_icon" src="//via.placeholder.com/32x32/123456/ffffff" />
            {props.item.attributes.source.replace(/^\/\//, '')}
            <a href={props.item.attributes.origin_url} styleName="origin_link" target="_blank">Source &raquo;</a>
          </div>
        </div>
      </div>
    </li>
  )
}

export default PlaylistItemDragPreview
