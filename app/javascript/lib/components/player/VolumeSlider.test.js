import React from 'react'
import VolumeSlider from './VolumeSlider'

import { getSnapshotJson } from '../../__tests__/testHelpers'

describe('VolumeSlider Component', () => {
  describe('Presenter', () => {
    it('Renders', () => {
      let tree = getSnapshotJson(<VolumeSlider/>)
      expect(tree).toMatchSnapshot()
    })
  })
})
