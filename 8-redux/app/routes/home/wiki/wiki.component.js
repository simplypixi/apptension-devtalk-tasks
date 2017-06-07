import React, { PropTypes, PureComponent } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export class Wiki extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <Card  className="wiki__card" zDepth={1}>
          <CardHeader
            title="Wiki query result"
          />
          <CardText>
            <p>{this.props.data}</p>
          </CardText>
        </Card>
      </div>
    );
  }
}
