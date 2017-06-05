import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import envConfig from 'env-config';

import messages from './home.messages';
import { MaintainerList } from './maintainerList/maintainerList.component';
import { LanguageSelector } from './languageSelector/languageSelector.component';
import { Weather } from './weather/weather.component';


export class Home extends PureComponent {
  static propTypes = {
    items: PropTypes.object,
    language: PropTypes.string.isRequired,
    weather: PropTypes.object.isRequired,
    fetchMaintainers: PropTypes.func.isRequired,
    fetchWeather: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.fetchMaintainers(this.props.language);
    this.props.fetchWeather('Poznan');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.language !== this.props.language) {
      this.props.fetchMaintainers(nextProps.language);
    }
    this.weather = nextProps.weather;
  }

  render() {
    const links = [{
      href: 'https://fonts.googleapis.com/css?family=News+Cycle',
      rel: 'stylesheet'
    }];
  
    return (
      <div className="home">
        <Helmet
          title="Homepage"
          link={links}
        />

        <h1 className="home__title">
          <i className="home__title-logo" />
          <FormattedMessage {...messages.welcome} />
        </h1>

        <div>Environment: {envConfig.name}</div>

        <LanguageSelector
          language={this.props.language}
          setLanguage={this.props.setLanguage}
          router={this.props.router}
        />

        <Weather
          data={this.props.weather}
        />
      </div>
    );
  }
}
