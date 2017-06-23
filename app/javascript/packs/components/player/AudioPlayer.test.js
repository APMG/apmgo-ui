import React from 'react'
import AudioPlayerPresenter from './AudioPlayer'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('AudioPlayer Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AudioPlayerPresenter />)
    console.log('WRAPPER', wrapper)
  })

  it('Presenter renders', () => {
    expect(wrapper.length).toEqual(1)
  })

})
