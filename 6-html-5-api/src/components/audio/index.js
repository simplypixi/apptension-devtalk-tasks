import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import AudioScene from './audioScene.js';

const bindAudioInput = (onSuccess, onError) => {
  navigator.getUserMedia({audio: true}, onSuccess, onError);
};

class Audio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stream: null,
      audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
      muted: false
    }

    this.analyser = this.state.audioCtx.createAnalyser();
    this.distortion = this.state.audioCtx.createWaveShaper();
    this.gainNode = this.state.audioCtx.createGain();
    this.biquadFilter = this.state.audioCtx.createBiquadFilter();

    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.muteMicrophone = this.muteMicrophone.bind(this);
    this.visualizeSound = this.visualizeSound.bind(this);

    bindAudioInput(this.onSuccess, this.onError);
  }

  visualizeSound(stream) {
    this.analyser.fftSize = 2048;
    const bufferLength = this.analyser.frequencyBinCount;
    const soundData = new Float32Array(bufferLength);

    const visualize = () => {
      requestAnimationFrame(visualize);
      this.analyser.getFloatTimeDomainData(soundData);
      this.setState({soundData});
    };

    visualize();
  }

  onSuccess(stream) {
    const source = this.state.audioCtx.createMediaStreamSource(stream);
    source.connect(this.analyser);
    this.analyser.connect(this.distortion);
    this.distortion.connect(this.biquadFilter);
    this.biquadFilter.connect(this.gainNode);
    this.gainNode.connect(this.state.audioCtx.destination);

    this.visualizeSound(stream);
  }

  onError(err) {
    console.log(`The following gUM error occured: ${err}`);
  }

  muteMicrophone() {
    this.setState(prevState => ({
      muted: !prevState.muted
    }));
    this.gainNode.gain.value = +this.state.muted;
  }

  render() {
    return (
      <div>
        <button onClick={this.muteMicrophone}>{this.state.muted ? 'Unmute' : 'Mute'}</button>
        <AudioScene soundData={this.state.soundData}/>
      </div>
    );
  }

}

export default Audio;
