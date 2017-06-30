
import React from 'react'
import { shallow, mount } from 'enzyme'
import getSnapshotJson, { getWrappedComponent } from '../../redux/__tests__/mock-initial-state'
import { muteClick, unmuteClick } from '../../redux/audio-player'

import MuteButton, {
  MuteButtonPresenter,
  mapDispatchToProps,
  mapStateToProps
} from './MuteButton'

describe('Mute Button Component', () => {
  describe('Presenter', () => {
    it('Displays a Mute Button When Unmuted', () => {
      let tree = getSnapshotJson(<MuteButtonPresenter muted={false}/>)
      expect(tree).toMatchSnapshot()
    })

    it('Displays an Unmute Button When Muted', () => {
      let tree = getSnapshotJson(<MuteButtonPresenter muted={true}/>)
      expect(tree).toMatchSnapshot()
    })

    it('Calls `mute` When Mute Button is Clicked', () => {
      let props = {
            mute: jest.fn()
          },
          component = getWrappedComponent(<MuteButtonPresenter {...props} />),
          wrapper = mount(component)

      wrapper.find('#mute-button').simulate('click')
      expect(props.mute.mock.calls.length).toEqual(1);
    })

    it('Calls `unmute` When Unmute Button is Clicked', () => {
      let props = {
            unmute: jest.fn(),
            muted: true
          },
          component = getWrappedComponent(<MuteButtonPresenter {...props} />),
          wrapper = mount(component)

      wrapper.find('#unmute-button').simulate('click')
      expect(props.unmute.mock.calls.length).toEqual(1);
    })
  })

  describe('Redux Connection', () => {

    let dispatchSpy

    beforeEach(() => {
      dispatchSpy = jest.fn()
    })

    it('Dispatches `muteClick` Action', () => {
      let { mute } = mapDispatchToProps(dispatchSpy)
      mute()
      expect(dispatchSpy).toHaveBeenCalled()
      expect(dispatchSpy.mock.calls[0][0]).toEqual(muteClick())
    })

    it('Dispatches `unmuteClick` Action', () => {
      let { unmute } = mapDispatchToProps(dispatchSpy)
      unmute()
      expect(dispatchSpy).toHaveBeenCalled()
      expect(dispatchSpy.mock.calls[0][0]).toEqual(unmuteClick())
    })

    it('Gets Mute From State', () => {
      let trueState = {audioPlayer: {muted: true}}
      let falseState = {audioPlayer: {muted: false}}

      expect(mapStateToProps(trueState)).toEqual({muted: true})
      expect(mapStateToProps(falseState)).toEqual({muted: false})
    })
  })
})
