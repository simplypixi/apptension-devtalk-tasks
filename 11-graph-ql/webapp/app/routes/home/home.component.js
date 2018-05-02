import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import envConfig from 'env-config';
import { FormattedMessage } from 'react-intl';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {debounce} from 'lodash';

import { Desktop, Window, WindowContainer, Note } from './home.styles';
import { Toolbar } from './toolbar';
import { NotesList } from './notesList';


export class HomeComponent extends PureComponent {
  static propTypes = {
    notes: PropTypes.object.isRequired,
    selectedNote: PropTypes.object.isRequired,
    setSelectedNote: PropTypes.func.isRequired,
    removeSelectedNote: PropTypes.func.isRequired,
    updateNoteDescription: PropTypes.func.isRequired,
  };

  handleDescriptionChange = (event) => {
    this.props.updateNoteDescription(event.target.value);
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
          />
          <WindowContainer>
            <NotesList
              items={feedQuery.notes}
              selected={selectedNote.get('id')}
              onItemClick={setSelectedNote}
            ></NotesList>
            <Note
              value={selectedNote.get('description')}
              onChange={this.handleDescriptionChange}
            ></Note>
          </WindowContainer>
        </Window>
      </Desktop>
    );
  }
}

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
export const Home = graphql(FEED_QUERY, { name: 'feedQuery' }) (HomeComponent);
