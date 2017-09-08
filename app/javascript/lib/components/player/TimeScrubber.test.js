
import React from 'react'
import { getSnapshotJson } from '../../__tests__/testHelpers'
import TimeScrubber from './TimeScrubber'

describe('Time Scrubber Component', () => {
  describe('Presenter', () => {
    it('Renders', () => {
      let tree = getSnapshotJson(<TimeScrubber paused />)
      expect(tree).toMatchSnapshot()
    })
  })
})
