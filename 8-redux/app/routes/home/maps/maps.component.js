import React, { PropTypes, PureComponent } from 'react';

export class Maps extends PureComponent {
  static propTypes = {
    places: PropTypes.object,
  }
  render() {
    return (
      <section className="maps">
        Maps
      </section>
    )
  }
}
