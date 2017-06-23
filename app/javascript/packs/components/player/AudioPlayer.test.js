import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { AudioPlayerPresenter } from './AudioPlayer'
import PlayPauseButton from './PlayPauseButton'
import MuteButton from './MuteButton'
import TimeScrubber from './TimeScrubber'
import VolumeSlider from './VolumeSlider'

let mockItems = [
  {
    "id": 1,
    "attributes": {
      "audio-title": 'Test Audio',
      "audio-url": 'https://play.publicradio.org/api-2.0.1/o/phc/2017/06/17/phc_20170617_128.mp3'
    }
  }
]

describe('AudioPlayer Presentational Component Test', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AudioPlayerPresenter item={mockItems[0]}/>)
  })

  it('Presenter renders', () => {
    expect(wrapper.length).toEqual(1)
  })

  it('Displays the audio title', () => {
    expect(wrapper.text()).toContain(mockItems[0].attributes['audio-title'])
  })

  it('Renders a PlayPauseButton', function() {
    expect(wrapper.find(PlayPauseButton).length).toEqual(1)
  })

  it('Renders a MuteButton', function() {
    expect(wrapper.find(MuteButton).length).toEqual(1)
  })

  it('Renders a TimeScrubber', function() {
    expect(wrapper.find(TimeScrubber).length).toEqual(1)
  })

  it('Renders a VolumeSlider', function() {
    expect(wrapper.find(VolumeSlider).length).toEqual(1)
  })

})
