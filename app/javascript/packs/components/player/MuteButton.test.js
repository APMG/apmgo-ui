
import React from 'react'
import getSnapshotJson from '../../redux/__tests__/mock-initial-state'
import MuteButton, { MuteButtonPresenter } from './MuteButton'

describe('Mute Button Component', () => {
  describe('Presenter', () => {
    it('Displays a Mute Button When Unmuted', () => {
      let tree = getSnapshotJson(<MuteButtonPresenter muted={false}/>)
      expect(tree).toMatchSnapshot()
    })
    it('Displays an Unmute Button When Muted', () => {
      let tree = getSnapshotJson(<MuteButtonPresenter muted={true}/>)
      expect(tree).toMatchSnapshot()
    })
  })
})
