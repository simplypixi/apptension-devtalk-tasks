import React, { PropTypes, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet-universal';
//import L from 'leaflet';
import { Card } from 'material-ui/Card';

import messages from './maps.messages';

export class Maps extends PureComponent {
  static propTypes = {
    places: PropTypes.object,
  };

  getIcon = () => {
    return
    // return new L.Icon({
    //   iconUrl: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/128/Map-Marker-Marker-Outside-Azure.png',
    //   iconAnchor: new L.Point(24, 48),
    //   iconSize: new L.Point(48, 48),
    // });
  };

  render() {
    const place = this.props.places.get(0);

    const { lat, lon, display_name: displayName } = place ? place.toJS() : { lat: '51.505', lon: '-0.09' };
    const position = [lat, lon];
    return (
      <div className="column--section column--map-section">
        <Card className="map">
          <div className="title-bar title-bar--pad">
            <i className="fa fa-map-o" aria-hidden="true"></i>
            <span className="label"><FormattedMessage {...messages.title} /></span>
          </div>
          {place ? (
            <section className="map__container">
              <div className="map-location-info">
                <p><i className="fa fa-map-marker" aria-hidden="true"></i><span className="label">{displayName}</span></p>
              </div>
              <Map center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
                  url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                />
                <Marker position={position}
                        
                >
                  <Popup>
                    <span>{displayName}</span>
                  </Popup>
                </Marker>
              </Map>
            </section>
          ) : (
            <div className="not-found-box">
              <p><i className="fa fa-binoculars" aria-hidden="true"></i><span className="label"><FormattedMessage {...messages.nodata} /></span></p>
            </div>
          )}
        </Card>
      </div>
    );
  }
}
