import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {debounce} from 'lodash';

import { Desktop, Window, WindowContainer, Note } from './home.styles';

import { Toolbar } from './toolbar';
import { NotesList } from './notesList';


export class Home extends PureComponent {
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
