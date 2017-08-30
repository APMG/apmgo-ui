
import React from 'react'
import { getSnapshotJson } from '../../__tests__/testHelpers'
import PlayTimeDisplay from './PlayTimeDisplay'

describe('Play Time Display Component', () => {
  describe('Presenter', () => {
    it('Works Without currentTime Prop and Displays 0:00', () => {
      let tree = getSnapshotJson(<PlayTimeDisplay />)
      expect(tree).toMatchSnapshot()
    })
    it('Displays currentTime When Prop is Passed', () => {
      let tree = getSnapshotJson(<PlayTimeDisplay currentTime={60} />)
      expect(tree).toMatchSnapshot()
    })
  })
})
