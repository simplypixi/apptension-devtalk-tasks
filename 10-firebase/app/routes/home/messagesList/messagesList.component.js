import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import moment from 'moment';
import {
  Container, List, ListItem, User,
  Message, When, Avatar, MessageContainer
} from './messagesList.styles';

export class MessagesList extends PureComponent {
  static propTypes = {
    messages: PropTypes.object.isRequired,
    users: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = { message: '' };

    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  getUser(item, users) {
    const id = item.get('user', '');

    return users.get(id, Map());
  }

  getDate(item) {
    const createdDate = item.get('createdDate');
    const max = -120;

    if (!createdDate) {
      return '';
    }

    const when = moment(createdDate);

    return when.diff(moment(), 'minutes') > max ? when.fromNow() : when.format('D.MM.Y h:m');
  }

  scrollToBottom() {
    this.chatList.scrollTop = this.chatList.scrollHeight;
  }

  render() {
    const users = this.props.users;
    const messageRow = (item, key) => {
      const user = this.getUser(item, users);
      const name = user.get('displayName', 'Anonym');

      return (
        <ListItem key={key}>
          <Avatar src={user.get('avatarUrl')}></Avatar>
          <MessageContainer>
            {/* <User>{name}</User> */}
            <Message>{item.get('text')}</Message>
            <When>{this.getDate(item)}</When>
          </MessageContainer>
        </ListItem>
      );
    };

    return (
      <Container>
        <List innerRef={(el) => { this.chatList = el; }}>
          {this.props.messages.toArray().map(messageRow)}
        </List>
      </Container>
    );
  }
}
