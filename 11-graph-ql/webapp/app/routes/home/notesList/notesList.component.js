import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  NotesListContainer,
  NotesListItem,
  NotesListItemTitle,
  NotesListItemDetails,
  NotesListItemDate,
  NotesListItemDesc
} from './notesList.styles';

export class NotesList extends PureComponent {
  static propTypes = {
    items: PropTypes.object.isRequired,
    selected: PropTypes.string,
    onItemClick: PropTypes.func.isRequired
  };

  isSelectedNote = (note) => {
    return this.props.selected && note.get('id') === this.props.selected;
  }

  renderNotes() {
    const {items} = this.props;
    return items.map((note) => {
      return (
        <NotesListItem
          key={note.get('id')}
          test = {'test'}
          selected={this.isSelectedNote(note)}
          onClick={() => this.props.onItemClick(note)}
        >
          <NotesListItemTitle>{note.get('title')}</NotesListItemTitle>
          <NotesListItemDetails>
            <NotesListItemDate>{note.get('date')}</NotesListItemDate>
            <NotesListItemDesc>{note.get('description')}</NotesListItemDesc>
          </NotesListItemDetails>
        </NotesListItem>
      )
    })
  }

  render() {
    return (
      <NotesListContainer>
        {this.renderNotes()}
      </NotesListContainer>
    );
  }
}
