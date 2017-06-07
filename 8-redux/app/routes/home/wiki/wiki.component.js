import React, { PropTypes, PureComponent } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export class Wiki extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const queryTitle = this.props.data.get('title');
    const queryId = this.props.data.get('pageid');
    return (
      <div className="column--section">
        <Card  className="wiki__card" zDepth={1}>
          <CardHeader
            title={queryTitle ? `Wiki results for ${queryTitle}` : 'There is no data...'}
            subtitle={queryId ? `Current page Wiki id is: ${queryId}` : 'No data - try with other query'}
          />
          <CardText>
            <div className="title-bar">
              <i className="fa fa-wikipedia-w" aria-hidden="true"></i>
              <span className="label">What does wiki say about...</span>
            </div>
            <p>{this.props.data.get('extract')}</p>
          </CardText>
        </Card>
      </div>
    );
  }
}
