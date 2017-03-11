import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';

class Vibration extends React.Component {

  render() {
    return(
      <MuiThemeProvider>
        <div className="vibration">
          <h1>Vibration Api</h1>
          <div className="georg-wrap">
            <img src="../../../src/assets/images/george-clooney.jpg" alt="georg image"/>
          </div>
          <RaisedButton className="trigger" label="Press to play" primary={true} />
        </div>
      </MuiThemeProvider>
    );
  }
};

export default Vibration;
