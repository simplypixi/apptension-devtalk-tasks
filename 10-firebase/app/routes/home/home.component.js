import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import envConfig from 'env-config';
import { database } from 'firebase';

import messages from './home.messages';
// import { MaintainerList } from './maintainerList/maintainerList.component';
import { MessagesList } from './messagesList/messagesList.component';
import { SendMessage } from './sendMessage/sendMessage.component';
import { Container, Title, TitleLogo, EnvName, Login } from './home.styles';

export class Home extends PureComponent {
  static propTypes = {
    items: PropTypes.object,
    language: PropTypes.string.isRequired,
    fetchMaintainers: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    updatedMessages: PropTypes.func.isRequired,
    messages: PropTypes.object,
    updatedUsers: PropTypes.func.isRequired,
    users: PropTypes.object,
    signInCurrentUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
    location: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
  }

  componentWillMount() {
    // this.props.fetchMaintainers(this.props.language);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.language !== this.props.language) {
      this.props.fetchMaintainers(nextProps.language);
    }
  }

  updateUsers(props) {
    database()
      .ref('users')
      .on('value', function onSuccess(snap) {
        props.updatedUsers(snap.val());
      });
  }

  updateMessages(props) {
    database()
      .ref('messages')
      .orderByChild('created')
      // .limitToLast(2)
      .on('value', function onSuccess(snap) {
        props.updatedMessages(snap.val());
      });
  }

  signIn() {
    this.props.signInCurrentUser();
    this.updateUsers(this.props);
    this.updateMessages(this.props);
  }

  render() {
    const isSigned = this.props.currentUser.get('isSigned');

    return (
      <Container>
        <Helmet title="Homepage" />

        <Title>
          <TitleLogo name="logo" />
          <FormattedMessage {...messages.welcome} />
        </Title>

        <EnvName>Environment: {envConfig.name}</EnvName>
        {isSigned ? (
          <React.Fragment>
            <MessagesList messages={this.props.messages} users={this.props.users} />
            <SendMessage />
          </React.Fragment>
        ) : (
          <Login onClick={this.signIn}>Sign in with Facebook</Login>
        )}
      </Container>
    );
  }
}
