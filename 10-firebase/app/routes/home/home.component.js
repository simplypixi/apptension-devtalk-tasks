import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import envConfig from 'env-config';
import firebase from 'firebase';

import messages from './home.messages';
// import { MaintainerList } from './maintainerList/maintainerList.component';
import { MessagesList } from './messagesList/messagesList.component';
import { SendMessage } from './sendMessage/sendMessage.component';
import { Container, Title, TitleLogo, EnvName, Login, Chat, TitleContainer } from './home.styles';

const { database, auth } = firebase;
const facebookProvider = new auth.FacebookAuthProvider();


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
    signIn: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
    location: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if (nextProps.currentUser.get('isSigned') && !this.props.currentUser.get('isSigned')) {
      this.updateUsers(nextProps);
      this.updateMessages(nextProps);
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
      .on('value', function onSuccess(snap) {
        props.updatedMessages(snap.val());
      });
  }

  render() {
    const isSigned = this.props.currentUser.get('isSigned');

    return (
      <Container>
        <Chat>
          <Helmet title="Homepage" />
          <TitleContainer>
            <Title>
              <TitleLogo name="logo" />
              <FormattedMessage {...messages.welcome} />
            </Title>
          </TitleContainer>

          {isSigned ? (
            <React.Fragment>
              <MessagesList
                currentUser={this.props.currentUser}
                messages={this.props.messages}
                users={this.props.users}
              />
              <SendMessage currentUser={this.props.currentUser} />
            </React.Fragment>
          ) : (
            <Login onClick={this.props.signIn}>Sign in with Facebook</Login>
          )}
        </Chat>
      </Container>
    );
  }
}
