import styles from './assets/stylesheets/style.scss';

import React from 'react';
import { render } from 'react-dom'
import { Router, Route , Link, browserHistory } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Vibration from './components/vibration/vibration.js';
import Audio from './components/audio';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';

import FlatButton from 'material-ui/FlatButton';

injectTapEventPlugin();

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
        <MuiThemeProvider>
          <Tabs>
            <Tab label="Home" value={0} containerElement={<Link to="/"/>}/>
            <Tab label="Vibration API" value={1} containerElement={<Link to="/vibration"/>}/>
            <Tab label="WebRTC audio" value={2} containerElement={<Link to="/audio"/>}/>
          </Tabs>
        </MuiThemeProvider>
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
    </Route>
  </Router>
);

render((routes), document.getElementById('root'));
