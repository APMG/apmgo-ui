import React from 'react'
import connect from 'react-redux'
import { mount, shallow } from 'enzyme'
import AudioPlayer, { AudioPlayerPresenter, mapStateToProps, mapDispatchToProps } from './AudioPlayer'
import { muteClick } from '../../redux/audio-player'
import { getSnapshotJson, itemFixtures, getMockStore, getWrappedComponent } from '../../redux/__tests__/mock-initial-state'
import MockableAudio from '../../redux/__tests__/mock-audio'
import AudioPlayerState from '../../models/AudioPlayerState'


let audioMockRef,
    getAudioMockRef = () => audioMockRef

class TestAudioPlayerPresenter extends AudioPlayerPresenter {

  componentDidMount() {
    this.audio = getAudioMockRef()
    super.componentDidMount()
  }
  componentWillReceiveProps(newProps) {
    this.audio = getAudioMockRef()
    super.componentWillReceiveProps(newProps)
  }
}

describe('AudioPlayer Component Test', () => {

  describe('Presenter', () => {

      let testProps

      beforeEach(() => {
        audioMockRef = {
          play: jest.fn(() => audioMockRef.paused = false),
          pause: jest.fn(() => audioMockRef.paused = true)
        },
        testProps = {
          item: itemFixtures[0],
          audioCanPlay: jest.fn(),
          audioMetaDataLoaded: jest.fn(),
          audioRefSet: jest.fn((ref, context) => context.audio = ref ),
          audioPlayer: {volume: 1}
        }
      })
    it('Renders', () => {
      let tree = getSnapshotJson(<TestAudioPlayerPresenter {...testProps} />)
      expect(tree).toMatchSnapshot()
    })

    it('Passes Functions To Audio Property', () => {
      let wrapper = mount(getWrappedComponent(<TestAudioPlayerPresenter { ...testProps} />, getMockStore()))

      wrapper.render()

      expect(getAudioMockRef().src).toEqual(itemFixtures[0].attributes.audio_url)
      expect(audioMockRef.oncanplay).toEqual(testProps.audioCanPlay)

      audioMockRef.oncanplay()
      audioMockRef.onloadedmetadata()

      expect(testProps.audioMetaDataLoaded).toHaveBeenCalled()
      expect(testProps.audioCanPlay).toHaveBeenCalled()
    })

    it('Updates Audio Element With New Props', () => {
      let wrapper = shallow(<TestAudioPlayerPresenter { ...testProps} />)

      let newProps = {
        ...testProps,
        audioPlayer: {
          muted: true,
          paused: false,
          volume: .5,
        }
      }

      wrapper.setProps(newProps)
      expect(audioMockRef.play).toHaveBeenCalled()
      expect(audioMockRef.muted).toEqual(newProps.audioPlayer.muted)
      expect(audioMockRef.paused).toEqual(newProps.audioPlayer.paused)
      expect(audioMockRef.volume).toEqual(newProps.audioPlayer.volume)

      let nextProps = {
        ...newProps,
        audioPlayer: {
          paused: true,
          muted: false,
          volume: .75
        }
      }

      wrapper.setProps(nextProps)

      expect(audioMockRef.pause).toHaveBeenCalled()
      expect(audioMockRef.muted).toEqual(nextProps.audioPlayer.muted)
      expect(audioMockRef.paused).toEqual(nextProps.audioPlayer.paused)
      expect(audioMockRef.volume).toEqual(nextProps.audioPlayer.volume)

      let newTrackProps = {
        ...nextProps,
        audioPlayer: {
          currentTrackId: itemFixtures[1].id,
          currentTime: itemFixtures[1].attributes.playtime,
          canPlay: true
        },
        item: itemFixtures[1]
      }

      wrapper.setProps(newTrackProps)

      expect(audioMockRef.play).toHaveBeenCalled()
      expect(audioMockRef.src).toEqual(itemFixtures[1].attributes.audio_url)

      let forceTimeUpdate = {
        ...newTrackProps,
        audioPlayer: {updateAudioElementTime: true}
      }

      wrapper.setProps(forceTimeUpdate)
      expect(audioMockRef.currentTime).toEqual(forceTimeUpdate.audioPlayer.currentTime)
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
  })
})
