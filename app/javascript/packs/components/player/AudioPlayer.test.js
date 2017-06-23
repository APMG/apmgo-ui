import React from 'react'
import { shallow } from 'enzyme'
import { AudioPlayerPresenter } from './AudioPlayer'
import getSnapshotJson, { itemFixtures } from '../../redux/__tests__/mock-initial-state'

describe('AudioPlayer Component Test', () => {
  describe('Presenter', () => {
    it('Renders', () => {
      let tree = getSnapshotJson(<AudioPlayerPresenter item={itemFixtures[0]} />)
      expect(tree).toMatchSnapshot();
    })
  })
})
