
import React from 'react'
import { getSnapshotJson } from '../../redux/__tests__/mock-initial-state'
import TimeScrubber from './TimeScrubber'

describe('Time Scrubber Component', () => {
  describe('Presenter', () => {
    it('Renders', () => {
      let tree = getSnapshotJson(<TimeScrubber paused={true} />)
      expect(tree).toMatchSnapshot()
    })
  })
})
