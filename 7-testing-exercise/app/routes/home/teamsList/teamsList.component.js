import React, { PropTypes, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './teamsList.messages';
import Team from '../team/team.component';


export default class TeamsList extends PureComponent {
  static propTypes = {
    items: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="teams-list">
        <h2 className="teams-list__title">
          <FormattedMessage {...messages.title} />:
        </h2>

        <ul className="teams-list__items">
          {this.props.items.toArray().map((item, key) => (
            <Team key={key} data={item} />
          ))}
        </ul>
      </div>
    );
  }
}
