import React from 'react';

const bindVideoInput = (onSuccess, onError) => {
  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);
  navigator.getUserMedia({video: true,  audio: false}, onSuccess, onError);
};

class Camera extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      new: true,
      counter: 3
    };

    this.size = this.props.size;

    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
    this.buildSnap = this.buildSnap.bind(this);
    this.newPhoto = this.newPhoto.bind(this);

    bindVideoInput(this.onSuccess, this.onError);
  }

  newPhoto() {
    this.setState({
      new: false,
      counter: 3
    });
    this.props.setSnap(null);
  }

  takePhoto() {
    const video = this.refs.video;
    const videoSize = video.videoHeight;
    const x = (video.videoWidth - videoSize) / 2;

    this.state.counter--;
    this.snap.drawImage(this.refs.video, x, 0, videoSize, videoSize, 0, 0, this.size, this.size);
    this.props.setSnap(this.canvasSnap);
  }

  buildSnap() {
    const canvas = document.createElement("canvas");

    canvas.width = this.size;
    canvas.height = this.size;
    
    this.canvasSnap = canvas;
    this.snap = canvas.getContext('2d');
  }

  onSuccess(stream) {
    this.stream = stream;

    if (navigator.mozGetUserMedia) {
      this.refs.video.mozSrcObject = stream;
    } else {
      const vendorURL = window.URL || window.webkitURL;
      this.refs.video.src = vendorURL.createObjectURL(stream);
    }

    this.refs.video.play();
  }

  onError(err) {
    console.log(`The following error occured: ${err}`);
  }

  componentDidMount() {
    this.buildSnap();
  }

  componentWillUnmount() {
    this.stream.getTracks()[0].stop();
  }

  render() {
    return(
      <div className="photobooth__camera">
        <div className="camera__frame">
          <div className={`camera__screen ${this.state.new ? 'new' : ''}`}>
            <div className="camera__stream-crop">
              <video className="camera__stream" ref="video">Camera stream not available.</video>
            </div>
            <button className="camera__button camera__button--new" onClick={this.newPhoto}>NEW</button>
            <button className="camera__button camera__button--renew" onClick={this.newPhoto}>NEW</button>
            <button className={`camera__button camera__button--shooter ${this.state.counter ? '' : 'camera__button--disabled'}`} onClick={this.state.counter ? this.takePhoto : null}>{this.state.counter}</button>
            <button className="camera__button camera__button--save camera__button--disabled">SAVE</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Camera;