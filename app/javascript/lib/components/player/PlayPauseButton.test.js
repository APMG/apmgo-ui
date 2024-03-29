
import React from 'react'
import { mount } from 'enzyme'
import { getSnapshotJson, getWrappedComponent } from '../../__tests__/testHelpers'

import PlayPauseButton from './PlayPauseButton'

describe('Play/Pause Button Component', () => {
  describe('Presenter', () => {
    it('Displays a Loading Button When It Can Not Play', () => {
      let tree = getSnapshotJson(<PlayPauseButton canPlay={false} />)
      expect(tree).toMatchSnapshot()
    })
    it('Displays a Play Button When Paused', () => {
      let props = {
        canPlay: true,
        paused: true
      }
      let tree = getSnapshotJson(<PlayPauseButton {...props} />)
      expect(tree).toMatchSnapshot()
    })
    it('Displays a Pause Button When Playing', () => {
      let props = {
        canPlay: true,
        paused: true
      }
      let tree = getSnapshotJson(<PlayPauseButton {...props} />)
      expect(tree).toMatchSnapshot()
    })
    it('Calls `play` When Play Button Is Clicked', () => {
      let props = {
        canPlay: true,
        paused: true,
        play: jest.fn()
      }
      let component = getWrappedComponent(<PlayPauseButton {...props} />)
      let wrapper = mount(component)

      wrapper.find('#play-button').simulate('click')
      expect(props.play.mock.calls.length).toEqual(1)
    })
    it('Calls `pause` When Pause Button Is Clicked', () => {
      let props = {
        canPlay: true,
        paused: false,
        pause: jest.fn()
      }
      let component = getWrappedComponent(<PlayPauseButton {...props} />)
      let wrapper = mount(component)

      wrapper.find('#pause-button').simulate('click')
      expect(props.pause.mock.calls.length).toEqual(1)
    })
  })
})
