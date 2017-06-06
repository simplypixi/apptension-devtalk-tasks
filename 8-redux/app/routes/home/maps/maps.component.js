import React, { PropTypes, PureComponent } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export class Maps extends PureComponent {
  static propTypes = {
    places: PropTypes.object,
  }

  render() {
    const position = [51.505, -0.09];

    return (
      <section className="maps">
        <Map center={position} zoom={5} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>
      </section>
    )
  }
}
