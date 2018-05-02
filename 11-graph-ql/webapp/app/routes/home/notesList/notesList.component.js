import React, { PureComponent } from 'react';
import { isEmpty } from 'ramda';
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
    items: PropTypes.array,
    selected: PropTypes.string,
    onItemClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    items: [],
  };

  isSelectedNote = (note) => {
    return this.props.selected && note.get('id') === this.props.selected;
  };

  renderNotes() {
    const {items} = this.props;
    if (isEmpty(items)) {
      return (<div>No notes at this point, please add some.</div>);
    }
    return items.map((note) => {
      return (
        <NotesListItem
          key={note.id}
          test = {'test'}
          selected={this.isSelectedNote(note)}
          onClick={() => this.props.onItemClick(note)}
        >
          <NotesListItemTitle>{note.title}</NotesListItemTitle>
          <NotesListItemDetails>
            <NotesListItemDate>{note.date}</NotesListItemDate>
            <NotesListItemDesc>{note.description}</NotesListItemDesc>
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
