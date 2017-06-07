import React, { PropTypes, PureComponent } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';


export class Weather extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  componentWillReceiveProps() {
    // nextProps) {
    // console.warn('>>>>', nextProps);
  }

  getSrc(icon) {
    return `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${icon}.png`;
  }

  render() {
    return (
      <div>
        <Card className="weather__card" zDepth={1}>
          <CardHeader
            title="Weather"
            subtitle={this.props.data.get('name')}
          />
          <CardText>
            <i className="fa fa-binoculars" aria-hidden="true"></i>
            <div className="weather__info">
              <div className="weather__icon-panel">
                <img src={this.getSrc(this.props.data.getIn(['weather', 0, 'icon']))} className="weather__icon">
                </img>
              </div>
              <div className="weather__data-panel">
                <p className="weather__row weather__temp">
                  {this.props.data.getIn(['main', 'temp'])}°C
                </p>
                <p className="weather__row weather__desc">
                  <span>{this.props.data.getIn(['weather', 0, 'main'])}</span>
                </p>
                <p className="weather__row">
                  <span className="weather__label">Humidity</span>
                  <span>{this.props.data.getIn(['main', 'humidity'])}%</span>
                </p>
                <p className="weather__row">
                  <span className="weather__label">Pressure</span>
                  <span>{this.props.data.getIn(['main', 'pressure'])}hPa</span>
                </p>
                <p className="weather__row">
                  <span className="weather__label">Wind</span>
                  <span>{this.props.data.getIn(['wind', 'speed'])}m/s</span>
                </p>
              </div>
            </div>

          </CardText>
        </Card>
      </div>
    );
  }
}
