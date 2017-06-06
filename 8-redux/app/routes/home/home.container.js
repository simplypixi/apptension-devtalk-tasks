import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Home } from './home.component';

import { MaintainersActions } from '../../modules/maintainers/maintainers.redux';
import { WeatherActions } from '../../modules/weather/weather.redux';
import { MapsActions } from '../../modules/maps/maps.redux';
import { selectMaintainersItems } from '../../modules/maintainers/maintainers.selectors';
import { selectWeathersItem } from '../../modules/weather/weather.selectors';
import { selectPlaces } from '../../modules/maps/maps.selectors';


import { LocalesActions } from '../../modules/locales/locales.redux';
import { selectLocalesLanguage } from '../../modules/locales/locales.selectors';

const mapStateToProps = createStructuredSelector({
  items: selectMaintainersItems,
  weather: selectWeathersItem,
  language: selectLocalesLanguage,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMaintainers: MaintainersActions.fetch,
  fetchWeather: WeatherActions.fetch,
  setLanguage: LocalesActions.setLanguage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
