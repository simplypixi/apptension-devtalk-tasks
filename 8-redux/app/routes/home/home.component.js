import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { debounce } from 'lodash';
import { FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import envConfig from 'env-config';

import messages from './home.messages';
import { LanguageSelector } from './languageSelector/languageSelector.component';
import { Weather } from './weather/weather.component';
import { Maps } from './maps/maps.component';

export class Home extends PureComponent {
  static propTypes = {
    items: PropTypes.object,
    language: PropTypes.string.isRequired,
    weather: PropTypes.object.isRequired,
    places: PropTypes.object,
    fetchMaintainers: PropTypes.func.isRequired,
    fetchWeather: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    fetchPlaces: PropTypes.func.isRequired,
  };

  constructor() {
    super(...arguments);

    this.state = {
      value: '',
    };
  }

  componentWillMount() {
    this.props.fetchMaintainers(this.props.language);
    this.props.fetchWeather('Poznan');
    this.props.fetchPlaces('Poznan');
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.language !== this.props.language) {
      this.props.fetchMaintainers(nextProps.language);
    }
    this.weather = nextProps.weather;
  };

  search = debounce((searchValue) => {
    this.props.fetchWeather(searchValue);
    this.props.fetchPlaces(searchValue);
  }, 200);

  handleChange = (event, searchValue) => {
    this.setState({
      value: searchValue,
    });
    this.search(searchValue);
  };

  render() {
    return (
      <div className="home">
        <Helmet
          title="Homepage"
          //link={links}
        />

        <div className="menu">
          <Paper zDepth={1} className="menu__box">
            <TextField className="menu__search"
              id="text-field-controlled"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Paper>
        </div>

        <Weather
          data={this.props.weather}
        />

        <Maps places={this.props.places} />
      </div>
    );
  }
}
