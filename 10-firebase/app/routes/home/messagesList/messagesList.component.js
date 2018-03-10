import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Container, List, ListItem, User, Message, When, Avatar } from './messagesList.styles';

export class MessagesList extends PureComponent {
  static propTypes = {
    messages: PropTypes.object.isRequired,
    users: PropTypes.object,
  };

  getUser(item, users) {
    const id = item.get('user', '');

    return users.get(id, Map());
  }

  getDate(item) {
    const when = item.get('createdDate');

    return when ? when.toDateString() : '';
  }

  render() {
    const users = this.props.users;
    const messageRow = (item, key) => {
      const user = this.getUser(item, users);
      const name = user.get('displayName', 'Anonym');

      return (
        <ListItem key={key}>
          <Avatar src={user.get('avatarUrl')}></Avatar>
          <User>{name}</User>
          <Message>{item.get('text')}</Message>
          <When>{this.getDate(item)}</When>
        </ListItem>
      );
    };

    return (
      <Container>
        <List>
          {this.props.messages.toArray().map(messageRow)}
        </List>
      </Container>
    );
  }
}
