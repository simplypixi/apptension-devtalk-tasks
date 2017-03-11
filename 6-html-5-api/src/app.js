import styles from './assets/stylesheets/style.scss';

import React from 'react';
import { render } from 'react-dom'
import { Router, Route , Link, browserHistory } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Vibration from './components/vibration/vibration.js';
import Audio from './components/audio';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import FlatButton from 'material-ui/FlatButton';

injectTapEventPlugin();

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Toolbar className="nav">
          <ToolbarGroup>
            <FlatButton><Link to="/">Home</Link></FlatButton>
            <FlatButton><Link to="/vibration">Vibration Api</Link></FlatButton>
            <FlatButton><Link to="/audio">Web RTC Audio</Link></FlatButton>
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>
    );
  }
}

const routes = (
  <Router history={browserHistory}>
    <Route name="app" path="/" component={App}></Route>
    <Route name="vibration" path="/vibration" component={Vibration}/>
    <Route name="audio" path="/audio" component={Audio}/>

  </Router>
);

render((routes), document.getElementById('root'));
