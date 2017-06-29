import React from 'react'
import { AudioPlayerPresenter } from './AudioPlayer'
import getSnapshotJson, { itemFixtures } from '../../redux/__tests__/mock-initial-state'
import AudioPlayerState from '../../models/AudioPlayerState'

class TestAudioPlayerPresenter extends AudioPlayerPresenter {
  componentDidMount() {
    // noop
    // because the audio element ref that is set during render()
    // is not getting set by jest, and this method throws an error
  }
}

describe('AudioPlayer Component Test', () => {
  describe('Presenter', () => {
    it('Renders', () => {
      let tree = getSnapshotJson(<TestAudioPlayerPresenter item={ itemFixtures[0] } />)
      expect(tree).toMatchSnapshot();
    })
  })
})
