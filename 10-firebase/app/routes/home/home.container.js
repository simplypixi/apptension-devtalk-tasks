import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import { Home } from './home.component';
import { MaintainersActions } from '../../modules/maintainers/maintainers.redux';
import { selectMaintainersItems } from '../../modules/maintainers/maintainers.selectors';
import { LocalesActions } from '../../modules/locales/locales.redux';
import { selectLocalesLanguage } from '../../modules/locales/locales.selectors';
import { MessagesActions } from '../../modules/messages/messages.redux';
import { selectMessages } from '../../modules/messages/messages.selectors';
import { UsersActions } from '../../modules/users/users.redux';
import { selectUsers } from '../../modules/users/users.selectors';
import { CurrentUserActions } from '../../modules/currentUser/currentUser.redux';
import { selectCurrentUser } from '../../modules/currentUser/currentUser.selectors';

const mapStateToProps = createStructuredSelector({
  items: selectMaintainersItems,
  language: selectLocalesLanguage,
  messages: selectMessages,
  users: selectUsers,
  currentUser: selectCurrentUser,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMaintainers: MaintainersActions.fetch,
  setLanguage: LocalesActions.setLanguage,
  updatedMessages: MessagesActions.updated,
  updatedUsers: UsersActions.updated,
  signIn: CurrentUserActions.signIn,
}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Home);
