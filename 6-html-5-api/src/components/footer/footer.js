import React from 'react';

const perfData = performance.timing;

const loadedTime = () => {
  let now = new Date().getTime();
  return now - perfData.navigationStart;
};

const totalLoadedTime = () => {
  let pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  return pageLoadTime;
};

const requestResponseTimes = () => perfData.responseEnd - perfData.requestStart;

const domLoadTime = () => perfData.domLoading;

class Footer extends React.Component {

  constructor() {
    super();
    this.loadedTime = loadedTime();
    this.totalLoadedTime = totalLoadedTime();
    this.requestResponseTimes = requestResponseTimes();
    this.domComplited = domLoadTime();
  }

  render() {
    return(
      <footer>
        <span className="footer-title">Navigation Timing API</span>
        <ul>
          <li>User-perceived page loading time:  <span>{this.loadedTime / 1000} s</span></li>
          <li>Total time required to load a page: <span>{this.totalLoadedTime / 1000} s</span></li>
          <li>Request response times: <span>{this.requestResponseTimes / 1000} s</span></li>
          <li>Dom loading: <span>{this.domComplited / 1000} s</span></li>
        </ul>
      </footer>
    );
  }
};

export default Footer;
