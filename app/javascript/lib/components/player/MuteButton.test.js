import React from 'react'
import { mount } from 'enzyme'
import { getSnapshotJson, getWrappedComponent } from '../../__tests__/testHelpers'

import MuteButton from './MuteButton'

describe('Mute Button Component', () => {
  describe('', () => {
    it('Displays a Mute Button When Unmuted', () => {
      let tree = getSnapshotJson(<MuteButton muted={false} />)
      expect(tree).toMatchSnapshot()
    })

    it('Displays an Unmute Button When Muted', () => {
      let tree = getSnapshotJson(<MuteButton muted />)
      expect(tree).toMatchSnapshot()
    })

    it('Calls `mute` When Mute Button is Clicked', () => {
      let props = {
        mute: jest.fn()
      }
      let component = getWrappedComponent(<MuteButton {...props} />)
      let wrapper = mount(component)

      wrapper.find('#mute-button').simulate('click')
      expect(props.mute.mock.calls.length).toEqual(1)
    })

    it('Calls `unmute` When Unmute Button is Clicked', () => {
      let props = {
        unmute: jest.fn(),
        muted: true
      }
      let component = getWrappedComponent(<MuteButton {...props} />)
      let wrapper = mount(component)

      wrapper.find('#unmute-button').simulate('click')
      expect(props.unmute.mock.calls.length).toEqual(1)
    })
  })
})
