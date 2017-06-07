import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { debounce } from 'lodash';
import { FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import messages from './home.messages';
import { LanguageSelector } from './languageSelector/languageSelector.component';
import { Weather } from './weather/weather.component';
import { Maps } from './maps/maps.component';
import { Wiki } from './wiki/wiki.component';

export class Home extends PureComponent {
  static propTypes = {
    items: PropTypes.object,
    language: PropTypes.string.isRequired,
    weather: PropTypes.object.isRequired,
    wiki: PropTypes.object.isRequired,
    places: PropTypes.object,
    fetchMaintainers: PropTypes.func.isRequired,
    fetchWeather: PropTypes.func.isRequired,
    fetchWiki: PropTypes.func.isRequired,
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
    this.props.fetchWiki('Poznan');
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.language !== this.props.language) {
      this.props.fetchMaintainers(nextProps.language);
    }
    this.weather = nextProps.weather;
    this.wiki = nextProps.wiki;
  };

  search = debounce((searchValue) => {
    this.props.fetchWeather(searchValue);
    this.props.fetchPlaces(searchValue);
    this.props.fetchWiki(searchValue);
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

        <Wiki
          data={this.props.wiki}
        />

        <Maps places={this.props.places} />
      </div>
    );
  }
}
