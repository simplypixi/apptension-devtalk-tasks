import React, { PropTypes, PureComponent } from 'react';


export class Weather extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  componentWillReceiveProps() {
    // nextProps) {
    // console.warn('>>>>', nextProps);
  }

  render() {
    return (
      <div className="weather-box">
        <h1>Weather in {this.props.data.get('name')}</h1>
        <ul>
          <li>Temperature: {this.props.data.getIn(['main', 'temp'])}°C</li>
          <li>Humidity: {this.props.data.getIn(['main', 'humidity'])}%</li>
          <li>Pressure: {this.props.data.getIn(['main', 'pressure'])}hPa</li>
          <li>Weather: {this.props.data.getIn(['weather', 0, 'main'])}</li>
          <li>
            <img src={'http://openweathermap.org/img/w/' + this.props.data.getIn(['weather', 0, 'icon']) + '.png'}>
            </img>
          </li>
          <li>Wind: {this.props.data.getIn(['wind', 'speed'])}m/s</li>
        </ul>
      </div>
    );
  }
}
