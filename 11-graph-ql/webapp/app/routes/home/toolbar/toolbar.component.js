import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ToolbarContainer, Dot, ToolbarButton } from './toolbar.styles';

const CREATE_NOTE = gql`
  mutation CreateNote($description: String) {
    createNote(description: $description) {
      id
      title
      description
      date
    }
  }
`;

const DELETE_NOTE = gql`
  mutation DeleteNote($id: String) {
    deleteNote(id: $id) {
      id
    }
  }
`;

export class Toolbar extends PureComponent {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onCreateNew: PropTypes.func.isRequired,
    disableCreate: PropTypes.bool,
    selectedNote: PropTypes.object
  };

  handleCreateNote = (createNote) => () => {
    createNote({
      variables: { description: ''},
    });
  };

  onCreateCompleted = (data) => {
    this.props.onCreateNew(data);
  }

  handleDeleteNote = (deleteNote) => () => {
    deleteNote({
      variables: { id: this.props.selectedNote.get('id')},
    });
  };

  onDeleteCompleted = (data) => {
    this.props.onDelete;
  }

  render() {
    return (
      <ToolbarContainer>
        <Dot color="#fe5f58" />
        <Dot color="#ffc330" />
        <Dot color="#29ca42" />
        <Mutation mutation={CREATE_NOTE} onCompleted={(e) => this.onCreateCompleted(e)} >
          {(createNote, {data}) => (
            <ToolbarButton
              disabled={this.props.disableCreate}
              onClick={this.handleCreateNote(createNote)}
            >
              Nowa
            </ToolbarButton>
          )}
        </Mutation>
        <Mutation mutation={DELETE_NOTE} onCompleted={this.onDeleteCompleted} >
          {(deleteNote, {data}) => (
            <ToolbarButton
              disabled={this.props.disableCreate}
              onClick={this.handleDeleteNote(deleteNote)}
            >
              Usuń
            </ToolbarButton>
          )}
        </Mutation>
      </ToolbarContainer>
    );
  }
}
