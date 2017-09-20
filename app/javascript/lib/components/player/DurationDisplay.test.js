// @flow
import React from 'react'
import { getSnapshotJson } from '../../__tests__/testHelpers'
import DurationDisplay from './DurationDisplay'

describe('Duration Time Display Component', () => {
  describe('Presenter', () => {
    it('Works Without duration Prop and Displays 0:00', () => {
      let tree = getSnapshotJson(<DurationDisplay />)
      expect(tree).toMatchSnapshot()
    })
    it('Displays duration When Prop is Passed', () => {
      let tree = getSnapshotJson(<DurationDisplay currentTime={60} />)
      expect(tree).toMatchSnapshot()
    })
  })
})
