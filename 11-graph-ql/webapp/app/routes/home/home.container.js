import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import { Home } from './home.component';

import {NotesActions} from '../../modules/notes/notes.redux';
import {
  selectSelectedNote,
  selectNotesItems
} from '../../modules/notes/notes.selectors';


const mapStateToProps = createStructuredSelector({
  notes: selectNotesItems,
  selectedNote: selectSelectedNote,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  setSelectedNote: NotesActions.setSelectedNote,
  removeSelectedNote: NotesActions.removeSelectedNote,
  createNewNote: NotesActions.createNewNote,
  updateNoteDescription: NotesActions.updateNoteDescription,
}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Home);
