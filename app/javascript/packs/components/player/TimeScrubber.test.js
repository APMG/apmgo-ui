
import React from 'react'
import getSnapshotJson from '../../redux/__tests__/mock-initial-state'
import TimeScrubber, { TimeScrubberPresenter } from './TimeScrubber'

describe('Time Scrubber Component', () => {
  describe('Presenter', () => {
    it('Renders', () => {
      let tree = getSnapshotJson(<TimeScrubberPresenter/>, {audioPlayer: { paused: true }})
      expect(tree).toMatchSnapshot()
    })
  })
})
