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
      value: 'Poznań',
    };
  }

  componentWillMount() {
    this.props.fetchMaintainers(this.props.language);
    this.props.fetchWeather({ value: this.state.value, lang: this.props.language });
    this.props.fetchPlaces({ value: this.state.value, lang: this.props.language });
    this.props.fetchWiki({ value: this.state.value, lang: this.props.language });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.language !== this.props.language) {
      this.props.fetchWeather({ value: this.state.value, lang: nextProps.language });
      this.props.fetchPlaces({ value: this.state.value, lang: nextProps.language });
      this.props.fetchWiki({ value: this.state.value, lang: nextProps.language });
    }
    this.weather = nextProps.weather;
    this.wiki = nextProps.wiki;
  };

  search = debounce((searchValue) => {
    this.props.fetchWeather({ value: searchValue, lang: this.props.language });
    this.props.fetchPlaces({ value: searchValue, lang: this.props.language });
    this.props.fetchWiki({ value: searchValue, lang: this.props.language });
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

        <div className="column column--one">
          <div className="menu column--section">
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
        </div>
        <div className="column column--two">
          <LanguageSelector
            language={this.props.language}
            setLanguage={this.props.setLanguage}
            router={this.props.router}
          />
          <Maps places={this.props.places} />
        </div>

        

        
      </div>
    );
  }
}
