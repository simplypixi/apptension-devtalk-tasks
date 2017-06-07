import React, { PropTypes, PureComponent } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import DivIcon from 'react-leaflet-div-icon';
import { Card, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export class Maps extends PureComponent {
  static propTypes = {
    places: PropTypes.object,
  };

  getIcon = () => {
    return new L.Icon({
        iconUrl: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/128/Map-Marker-Marker-Outside-Azure.png',
        iconAnchor: new L.Point(24, 48),
        iconSize: new L.Point(48, 48),
    });
  };

  render() {
    const place = this.props.places.get(0);

    const { lat, lon, display_name: displayName, icon, type } = place ? place.toJS() : { lat: '51.505', lon: '-0.09' };
    const position = [lat, lon];
    return (
      <Card className="map">
        <CardHeader
          title={displayName || 'There is no data...'}
          avatar={icon}
          subtitle={type ? `Type: ${type}` : 'try with other query'}
        />
        {place ? (
          <section className="map__container">
            <Map center={position} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
                url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
              />
              <Marker position={position}
                      icon={this.getIcon()}
              >
                <Popup>
                  <span>{displayName}</span>
                </Popup>
              </Marker>
            </Map>
          </section>
        ) : ''}
      </Card>
    );
  }
}

/*var Stamen_Terrain = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 18,
  ext: 'png'
});*/
