import React, { PropTypes, PureComponent } from 'react';
import { isNil } from 'lodash';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export class Wiki extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const hasData = !isNil(this.props.data.getIn(['query']));

    return (
      <div className="column--section">
        <Card  className="wiki__card" zDepth={1}>
          <CardText>
            <div className="title-bar">
              <i className="fa fa-wikipedia-w" aria-hidden="true"></i>
              <span className="label">What does wiki say about...</span>
            </div>
            { hasData ? (
              <p>{this.props.data}</p>
            ) : (
              <div className="not-found-box">
                <p>
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                  <span className="label">Other question please.</span>
                </p>
              </div>
            )}
          </CardText>
        </Card>
      </div>
    );
  }
}
