import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Home } from './home.component';

import { MaintainersActions } from '../../modules/maintainers/maintainers.redux';
import { WeatherActions } from '../../modules/weather/weather.redux';
import { WikiActions } from '../../modules/wiki/wiki.redux';
import { MapsActions } from '../../modules/maps/maps.redux';
import { selectMaintainersItems } from '../../modules/maintainers/maintainers.selectors';
import { selectWeathersItem } from '../../modules/weather/weather.selectors';
import { selectWikiItem } from '../../modules/wiki/wiki.selectors';
import { selectPlaces } from '../../modules/maps/maps.selectors';


import { LocalesActions } from '../../modules/locales/locales.redux';
import { selectLocalesLanguage } from '../../modules/locales/locales.selectors';

const mapStateToProps = createStructuredSelector({
  items: selectMaintainersItems,
  weather: selectWeathersItem,
  wiki: selectWikiItem,
  language: selectLocalesLanguage,
  places: selectPlaces,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMaintainers: MaintainersActions.fetch,
  fetchWeather: WeatherActions.fetch,
  fetchPlaces: MapsActions.fetch,
  fetchWiki: WikiActions.fetch,
  setLanguage: LocalesActions.setLanguage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
