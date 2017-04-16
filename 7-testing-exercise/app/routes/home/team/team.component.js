import React, { PropTypes, PureComponent } from 'react';


export default class Team extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const spanStyle = {
      backgroundImage: 'url(' + this.props.data.get('crestUrl') + ')',
    };

    return (
      <li className="team">
        <span className="team-logo" style={spanStyle}></span>
        <span className="team-name">{this.props.data.get('name')},</span>
        <span className="team-value">{this.props.data.get('squadMarketValue')}</span>
      </li>
    );
  }
}
