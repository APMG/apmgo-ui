import React from 'react'
import { shallow } from 'enzyme'
import MuteButton, { MuteButtonPresenter } from './MuteButton'

describe('Mute Button Component', () => {

  describe('Presenter', () => {

    let wrapper

    beforeEach(() => {
    })

    it('Displays a Mute button', () => {
      wrapper = shallow(<MuteButtonPresenter muted={false}/>)
      expect(wrapper.text()).toContain('Mute')
      expect(wrapper.text()).not.toContain('Unmute')
    })

    it('Displays an Unmute button', () => {
      wrapper = shallow(<MuteButtonPresenter muted={true}/>)
      expect(wrapper.text()).toContain('Unmute')
      expect(wrapper.text()).not.toContain('Mute')
    })

  })

})
