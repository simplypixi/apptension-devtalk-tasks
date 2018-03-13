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
var provider = new auth.FacebookAuthProvider();


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
    firebase.auth().signInWithPopup(provider).then((result) => {
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      const { photoURL, displayName, email } = user;

      const action = {
        user: {
          avatarUrl: photoURL,
          displayName: displayName,
          email,
        },
      };

      this.props.signInCurrentUser(action);
      this.updateUsers(this.props);
      this.updateMessages(this.props);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
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
              <MessagesList messages={this.props.messages} users={this.props.users} />
              <SendMessage currentUser={this.props.currentUser} />
            </React.Fragment>
          ) : (
            <Login onClick={this.signIn}>Sign in with Facebook</Login>
          )}
        </Chat>
      </Container>
    );
  }
}
