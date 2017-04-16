import React, { PropTypes, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './averageValue.messages';

export default class AverageValue extends PureComponent {
  static propTypes = {
    arithmeticAverage: PropTypes.number.isRequired,
  };

  render() {
    return (
      <div className="average-value">
        <FormattedMessage {...messages.info} values={{ value: this.props.arithmeticAverage }} />
      </div>
    );
  }
}
