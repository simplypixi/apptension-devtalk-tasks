import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';

let vibrateInterval = null;
let isVibrating = false;

const interval = 500;
const duration = 200;

const startVibrate = () => {
  isVibrating = true;
  navigator.vibrate(duration);
};

const stopVibrate = () => {
  isVibrating = false;
  if(vibrateInterval) clearInterval(vibrateInterval);
  navigator.vibrate(0);
};


const startPeristentVibrate = () => {
  vibrateInterval = setInterval(() => {
    startVibrate(duration);
  }, interval);
};

class Vibration extends React.Component {

  constructor() {
    super();
    this.vibrationDetection = this.vibrationDetection.bind(this);
    this.isVibrationSupported =  this.vibrationDetection();
  }

  vibrationDetection() {
    return "vibrate" in navigator
  }

  render() {
    return(
      <MuiThemeProvider>
        <div className="vibration-wrap">
          <div className="vibration">
            <h1>Oh Georg!</h1>
            <div className="georg-wrap">
              <img src="../../../src/assets/images/george-clooney.jpg" alt="georg image"/>
            </div>
            {this.isVibrationSupported ? (
              <div>
                <RaisedButton className="trigger" label="Press to play" primary={true} onClick={startPeristentVibrate} />
                <RaisedButton className="trigger" label="Press to stop" primary={true} onClick={stopVibrate} />
              </div>
            ) : (
              <RaisedButton className="trigger" label="Vibration not supported" primary={true} />
            )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
};

export default Vibration;
