
import React from 'react'
import getSnapshotJson from '../../redux/__tests__/mock-initial-state'
import PlayPauseButton, { PlayPauseButtonPresenter } from './PlayPauseButton'

describe('Play/Pause Button Component', () => {
  describe('Presenter', () => {
    it('Displays a Play Button When Paused', () => {
      let tree = getSnapshotJson(<PlayPauseButtonPresenter paused={true}/>)
      expect(tree).toMatchSnapshot()
    })
    it('Displays a Pause Button When Playing', () => {
      let tree = getSnapshotJson(<PlayPauseButtonPresenter paused={false}/>)
      expect(tree).toMatchSnapshot()
    })
  })
})
