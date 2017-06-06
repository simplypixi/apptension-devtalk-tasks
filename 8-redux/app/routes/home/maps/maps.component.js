import React, { PropTypes, PureComponent } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export class Maps extends PureComponent {
  static propTypes = {
    places: PropTypes.object,
  };

  render() {
    const place = this.props.places.get(0);

    const {lat, lon, display_name} = place ? place.toJS() : {lat: "51.505", lon: "-0.09"};
    const position = [lat, lon];
    debugger
    return (
      <section className="maps">
        <Map center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              <span>{display_name}</span>
            </Popup>
          </Marker>
        </Map>
      </section>
    );
  }
}
