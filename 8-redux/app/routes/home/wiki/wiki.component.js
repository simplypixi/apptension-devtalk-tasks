import React, { PropTypes, PureComponent } from 'react';
import { isNil } from 'lodash';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { FormattedMessage } from 'react-intl';

import messages from './wiki.messages';

export class Wiki extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const queryTitle = this.props.data.get('title');
    const queryId = this.props.data.get('pageid');
    const hasData = !isNil(this.props.data.get('extract'));

    return (
      <div className="column--section">
        <Card  className="wiki__card" zDepth={1}>
          <CardText>
            <div className="title-bar">
              <i className="fa fa-wikipedia-w" aria-hidden="true"></i>
              <span className="label"><FormattedMessage {...messages.title} /></span>
            </div>
            { hasData ? (
              <div>
                <p>{this.props.data.get('extract')}</p>
                <div className="weather__label">Wiki results for {queryTitle}. Current page Wiki id is {queryId}.</div>
              </div>
            ) : (
              <div className="not-found-box">
                <p>
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                  <span className="label"><FormattedMessage {...messages.nodata} /></span>
                </p>
              </div>
            )}

          </CardText>
        </Card>
      </div>
    );
  }
}
