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
    console.log('Notes: ', this.props.feedQuery.notes);
    return (
      <Desktop>
        <Window>
          <Toolbar
            onCreateNew={this.props.createNewNote}
            onDelete={this.props.removeSelectedNote}
            disableCreate={this.props.selectedNote.get('isNew')}
          />
          <WindowContainer>
            <NotesList
              items={this.props.notes}
              selected={this.props.selectedNote.get('id')}
              onItemClick={this.props.setSelectedNote}
            ></NotesList>
            <Note
              value={this.props.selectedNote.get('description')}
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
