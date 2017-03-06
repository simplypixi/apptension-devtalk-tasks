import React from 'react';
import { render } from 'react-dom'
import { Router, Route , Link, browserHistory } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Vibration from './components/vibration/vibration.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import FlatButton from 'material-ui/FlatButton'

injectTapEventPlugin();

let App = React.createClass({
  render() {
    return (
      <MuiThemeProvider>
        <Toolbar className="nav">
          <ToolbarGroup>
            <FlatButton to="/"><Link to="/">Home</Link></FlatButton>
            <FlatButton to="/vibration"><Link to="/vibration">Vibration Api</Link></FlatButton>
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>
    );
  }
});

const routes = (
  <Router history={browserHistory}>
    <Route name="app" path="/" component={App}></Route>
    <Route name="vibration" path="/vibration" component={Vibration}/>
  </Router>
);

render((routes), document.getElementById('root'));
