import React, { PureComponent } from 'react';
import { database } from 'firebase';
import PropTypes from 'prop-types';
import { Container } from './sendMessage.styles';

export class SendMessage extends PureComponent {
  static propTypes = {
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = { message: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.message) {
      const text = this.state.message;

      database()
        .ref('messages')
        .push({
          text,
          user: this.props.currentUser.get('id'),
          created: database.ServerValue.TIMESTAMP,
        })
        .then(() => {
          this.setState({ message: '' });
        });
    }
  }

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.message} onChange={this.handleChange} placeholder="Type a message..." />
          <input type="submit" value="Submit"/>
        </form>
      </Container>
    );
  }
}
