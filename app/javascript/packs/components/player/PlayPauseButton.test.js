
import React from 'react'
import { mount } from 'enzyme'
import getSnapshotJson, { getWrappedComponent, itemFixtures } from '../../redux/__tests__/mock-initial-state'
import { playClick, pauseClick } from '../../redux/audio-player'

import PlayPauseButton, {
  PlayPauseButtonPresenter,
  mapDispatchToProps,
  mapStateToProps
} from './PlayPauseButton'

describe('Play/Pause Button Component', () => {
  describe('Presenter', () => {
    it('Displays a Loading Button When It Can Not Play', () => {
      let tree = getSnapshotJson(<PlayPauseButtonPresenter canPlay={false}/>)
      expect(tree).toMatchSnapshot()
    })
    it('Displays a Play Button When Paused', () => {
      let props = {
        canPlay: true,
        paused: true
      },
      tree = getSnapshotJson(<PlayPauseButtonPresenter {...props} />)
      expect(tree).toMatchSnapshot()
    })
    it('Displays a Pause Button When Playing', () => {
      let props = {
        canPlay: true,
        paused: true
      },
      tree = getSnapshotJson(<PlayPauseButtonPresenter {...props} />)
      expect(tree).toMatchSnapshot()
    })
    it('Calls `play` When Play Button Is Clicked', () => {
      let props = {
        canPlay: true,
        paused: true,
        play: jest.fn()
      },
      component = getWrappedComponent(<PlayPauseButtonPresenter {...props} />),
      wrapper = mount(component)

      wrapper.find('#play-button').simulate('click')
      expect(props.play.mock.calls.length).toEqual(1);
    })
    it('Calls `pause` When Pause Button Is Clicked', () => {
      let props = {
        canPlay: true,
        paused: false,
        pause: jest.fn()
      },
      component = getWrappedComponent(<PlayPauseButtonPresenter {...props} />),
      wrapper = mount(component)

      wrapper.find('#pause-button').simulate('click')
      expect(props.pause.mock.calls.length).toEqual(1);
    })
  })

  describe('Redux Connection', () => {
    // 
    // let dispatchSpy
    //
    // beforeEach(() => {
    //   dispatchSpy = jest.fn()
    // })

    // it('Dispatches `playClick` Action', () => {
    //   let item_id = itemFixtures[0].id,
    //       ownProps = { item_id: item_id },
    //       { play } = mapDispatchToProps(dispatchSpy, ownProps)
    //
    //   play(ownProps.item_id)
    //   expect(dispatchSpy).toHaveBeenCalled()
    //   expect(dispatchSpy.mock.calls[0][0]).toEqual(playClick(item_id))
    // })
    //
    // it('Dispatches `pauseClick` Action', () => {
    //   let item_id = itemFixtures[0].id,
    //       ownProps = { item_id: item_id },
    //       { pause } = mapDispatchToProps(dispatchSpy, ownProps)
    //
    //   pause(item_id)
    //   expect(dispatchSpy).toHaveBeenCalled()
    //   expect(dispatchSpy.mock.calls[0][0]).toEqual(pauseClick(item_id))
    // })
  })
})
