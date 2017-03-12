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
    };

    this.analyser = this.state.audioCtx.createAnalyser();
    this.distortion = this.state.audioCtx.createWaveShaper();
    this.gainNode = this.state.audioCtx.createGain();
    this.biquadFilter = this.state.audioCtx.createBiquadFilter();

    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.visualizeSound = this.visualizeSound.bind(this);

    bindAudioInput(this.onSuccess, this.onError);
  }

  visualizeSound() {
    this.analyser.fftSize = 2048;
    const bufferLength = this.analyser.frequencyBinCount;
    const soundData = new Float32Array(bufferLength);

    const visualize = () => {
      this.requestId = requestAnimationFrame(visualize);
      this.analyser.getFloatTimeDomainData(soundData);
      this.setState({soundData});
    };

    visualize();
  }

  onSuccess(stream) {
    this.stream = stream;
    const source = this.state.audioCtx.createMediaStreamSource(this.stream);
    source.connect(this.analyser);
    this.analyser.connect(this.distortion);
    this.distortion.connect(this.biquadFilter);
    this.biquadFilter.connect(this.gainNode);
    this.gainNode.connect(this.state.audioCtx.destination);
    this.gainNode.gain.value = 0; //MUTED
    this.visualizeSound(this.stream);
  }

  onError(err) {
    console.log(`The following gUM error occured: ${err}`);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.requestId);
    this.stream.getTracks()[0].stop();
  }

  render() {
    return (
      <div>
        <AudioScene soundData={this.state.soundData}/>
      </div>
    );
  }

}

export default Audio;
