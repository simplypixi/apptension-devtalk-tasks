import React, { PropTypes, PureComponent } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export class Wiki extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="column--section">
        <Card  className="wiki__card" zDepth={1}>
          <CardText>
            <div className="title-bar">
              <i className="fa fa-wikipedia-w" aria-hidden="true"></i>
              <span className="label">What does wiki say about...</span>
            </div>
            <p>{this.props.data}</p>
          </CardText>
        </Card>
      </div>
    );
  }
}
