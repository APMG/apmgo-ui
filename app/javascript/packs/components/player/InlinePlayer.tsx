import { React } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import PlayPauseButton from './PlayPauseButton'

interface AudioControlsProps {
  audio: Element,
  
}

class AudioControls {

  

  componentWillMount() {
    this.audio = this.props.audioEl
  }

  render() {

  }

}

class AudioPlayer {

  onPlay() {
    this.audio.play()
  }

  onPause() {
    this.audio.pause()
  }

  render() {
    return (
      <div>
        { this.player.render() }
        <AudioControls audio={this.audioEl} />
      </div>
    )
  }

  componentWillMount() {
    this.player = new ReactAudioPlayer({
      src: this.props.item.src,
      controls: false,
      onPlay: this.onPlay,
      onPause: this.onPause
    })
  }

  componentDidMount() {
      this.audio = this.player.audioEl;
  }

}

mapDispatchToProps() {
  
}

mapStateToProps() {

}