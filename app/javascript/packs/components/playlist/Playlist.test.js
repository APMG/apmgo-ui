import React from 'react'
import { PlaylistPresenter } from './Playlist'
import getSnapshotJson from '../../redux/__tests__/mock-initial-state'

describe('Playlist Component', () => {
  describe('Presenter', () => {
    it('Renders', () => {
      let tree = getSnapshotJson(<PlaylistPresenter />)
      expect(tree).toMatchSnapshot()
    })
    it('Renders With Empty Data', () => {
      let tree = getSnapshotJson(<PlaylistPresenter />, {data: []})
      expect(tree).toMatchSnapshot()
    })
  })
})
