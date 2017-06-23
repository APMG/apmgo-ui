import React from 'react'
import VolumeSlider from './VolumeSlider'

import getSnapshotJson from '../../redux/__tests__/mock-initial-state'

describe('VolumeSlider Component', () => {
  describe('Presenter', () => {
    it('Renders', () => {
      let tree = getSnapshotJson(<VolumeSlider/>)
      expect(tree).toMatchSnapshot()
    })
  })
})
