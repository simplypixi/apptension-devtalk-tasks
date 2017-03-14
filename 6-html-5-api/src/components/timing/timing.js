import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const perfData = window.performance.timing;

const loadedTime = () => {
  let now = new Date().getTime();
  return now - performance.timing.navigationStart;
};

const totalLoadedTime = () => {
  let pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  return pageLoadTime;
};

const requestResponseTimes = () => {
  return perfData.responseEnd - perfData.requestStart;
};

class Timing extends React.Component {

  constructor() {
    super();
    this.loadedTime = loadedTime();
    this.totalLoadedTime = totalLoadedTime();
    this.requestResponseTimes = requestResponseTimes();
  }

  render() {
    return(
      <MuiThemeProvider>
        <div className="vibration">
          <h1>Navigation Timing API</h1>
          <p>User-perceived page loading time:  {this.loadedTime}</p>
          <p>Total time required to load a page: {this.totalLoadedTime}</p>
          <p>Request response times: {this.requestResponseTimes}</p>
        </div>
      </MuiThemeProvider>
    );
  }
};

export default Timing;
