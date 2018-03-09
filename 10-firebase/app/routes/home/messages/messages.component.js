import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Container, List, ListItem, User, Message, When } from './messages.styles';

export class MessagesList extends PureComponent {
  static propTypes = {
    messages: PropTypes.object.isRequired,
    users: PropTypes.object,
  };

  getUserFullName(item, users) {
    const id = item.get('user', '');
    const user = users.get(id, Map());

    return user.get('displayName', id);
  }

  getDate(item) {
    const when = item.get('createdDate');

    return when ? when.toDateString() : '';
  }

  render() {
    const users = this.props.users;
    return (
      <Container>
        <List>
          {this.props.messages.toArray().map((item, key) => (
            <ListItem key={key}>
              <User>{this.getUserFullName(item, users)}</User>
              <Message>{item.get('text')}</Message>
              <When>{this.getDate(item)}</When>
            </ListItem>
          ))}
        </List>
      </Container>
    );
  }
}
