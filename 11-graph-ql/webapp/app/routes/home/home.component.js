import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import envConfig from 'env-config';
import { FormattedMessage } from 'react-intl';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {debounce} from 'lodash';

import { Desktop, Window, WindowContainer, Note } from './home.styles';
import { Toolbar } from './toolbar';
import { NotesList } from './notesList';

const FEED_QUERY = gql`
  query FeedQuery {
    notes{
      id,
      title,
      description,
      date,
      isDone,
      author{
        name
      }
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation UpdateNote($id: String!, $description: String!) {
    updateNote(id: $id, description: $description) {
      id,
      title,
      description,
      date,
      isDone,
      author{
        name
      }
    }
  }
`;

export class HomeComponent extends PureComponent {
  static propTypes = {
    notes: PropTypes.object.isRequired,
    selectedNote: PropTypes.object.isRequired,
    setSelectedNote: PropTypes.func.isRequired,
    removeSelectedNote: PropTypes.func.isRequired,
    updateNoteDescription: PropTypes.func.isRequired,
  };

  handleDescriptionChange = (updateNote, props) => (event) => {
    updateNote({variables: {
      id: props.selectedNote.get('id'),
      description: event.target.value }
    });
    props.updateNoteDescription(event.target.value);
  };

  render() {
    console.log('Feed query: ', this.props.feedQuery);
    const {createNewNote, removeSelectedNote, selectedNote, setSelectedNote, feedQuery} = this.props;
    return (
      <Desktop>
        <Window>
          <Toolbar
            onCreateNew={createNewNote}
            onDelete={removeSelectedNote}
            disableCreate={selectedNote.get('isNew')}
            selectedNote={selectedNote}
          />
          <WindowContainer>
            <NotesList
              items={feedQuery.notes}
              selected={selectedNote.get('id')}
              onItemClick={setSelectedNote}
            ></NotesList>
            <Mutation mutation={ UPDATE_NOTE }>
              {(updateNote, {data}) => (
                <Note
                  value={selectedNote.get('description')}
                  onChange={this.handleDescriptionChange(updateNote, this.props) }
                ></Note>
              )}
            </Mutation>
          </WindowContainer>
        </Window>
      </Desktop>
    );
  }
}

export const Home = graphql(FEED_QUERY, { name: 'feedQuery' }) (HomeComponent);
