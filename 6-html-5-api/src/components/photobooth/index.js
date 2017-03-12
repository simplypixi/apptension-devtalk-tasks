import React from 'react';

import Camera from './camera';
import Photo from './photo';

class Photobooth extends React.Component {
  constructor() {
    super();

    this.state = {
      snap: null
    }

    this.size = 200;
  }

  setSnap(value) {
    this.setState({
      snap: value
    })
  }

  render() {
    return(
      <div>
        <h1>Duck face photobooth</h1>
        <Camera setSnap={this.setSnap.bind(this)} size={this.size}/>
        <Photo snap={this.state.snap} />
      </div>
    );
  }
}

export default Photobooth;
