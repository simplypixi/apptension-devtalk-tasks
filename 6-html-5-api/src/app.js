import './assets/stylesheets/styles.scss';

import React from 'react';
import { render } from 'react-dom'
import { Router, Route , Link, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Tabs, Tab} from 'material-ui/Tabs';

import Vibration from './components/vibration/vibration.js';
import Audio from './components/audio';
import Photobooth from './components/photobooth';
import Footer from './components/footer/footer';


injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#FFF',
    accent1Color: '#942349',
    textColor: '#942349',
    alternateTextColor: '#942349'
  }
});

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      slideIndex: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      slideIndex: value,
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Tabs>
            <Tab label="Home" value={0} containerElement={<Link to="/"/>}/>
            <Tab label="Vibration API" value={1} containerElement={<Link to="/vibration"/>}/>
            <Tab label="WebRTC audio" value={2} containerElement={<Link to="/audio"/>}/>
            <Tab label="Stunning duck face" value={3} containerElement={<Link to="/photobooth"/>}/>
          </Tabs>
        </MuiThemeProvider>
        <Footer></Footer>
        {this.props.children}
      </div>
    );
  }
}

const routes = (
  <Router history={browserHistory}>
    <Route name="app" path="/" component={App}>
      <Route name="vibration" path="/vibration" component={Vibration}/>
      <Route name="audio" path="/audio" component={Audio}/>
      <Route name="photobooth" path="/photobooth" component={Photobooth}/>
    </Route>
  </Router>
);

render((routes), document.getElementById('root'));
