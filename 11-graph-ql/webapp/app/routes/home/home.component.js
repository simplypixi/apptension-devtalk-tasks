import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import envConfig from 'env-config';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import messages from './home.messages';
import { MaintainerList } from './maintainerList/maintainerList.component';
import { Container, Title, TitleLogo, EnvName } from './home.styles';

export class HomeComponent extends PureComponent {
  static propTypes = {
    items: PropTypes.object,
    language: PropTypes.string.isRequired,
    fetchMaintainers: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    this.props.fetchMaintainers(this.props.language);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.language !== this.props.language) {
      this.props.fetchMaintainers(nextProps.language);
    }
  }

  render() {
    console.log('Feed query: ', this.props.feedQuery);
    console.log('Notes: ', this.props.feedQuery.notes);
    return (
      <Container>
        <Helmet title="Homepage" />

        <Title>
          <TitleLogo name="logo" />
          <FormattedMessage {...messages.welcome} />
        </Title>

        <EnvName>Environment: {envConfig.name}</EnvName>

        <MaintainerList items={this.props.items} />
      </Container>
    );
  }
}

const FEED_QUERY = gql`
  query FeedQuery {
    notes{
      id,
      content,
      author{
        name
      }
    }
  }
`;
export const Home = graphql(FEED_QUERY, { name: 'feedQuery' }) (HomeComponent);
