import { isNil } from 'ramda';
import { createActions, createReducer } from 'reduxsauce';
import { Record, List, fromJS } from 'immutable';

export const { Types: MessagesTypes, Creators: MessagesActions } = createActions({
  updated: ['messages'],
}, { prefix: 'MESSAGES_' });

const MessagesRecord = new Record({
  messages: List(),
});

export const INITIAL_STATE = new MessagesRecord({});

const updateHandler = (state = INITIAL_STATE, action) => {
  const { messages = [] } = action;

  let updatedMessages = messages.filter((item) => {
    item.createdDate = new Date(item.created);

    return !isNil(item);
  });

  updatedMessages = fromJS(updatedMessages)
    .sortBy((item) => item.get('timestamp'))
    .reverse();

  return state.set('messages', updatedMessages);
};

export const reducer = createReducer(INITIAL_STATE, {
  [MessagesTypes.UPDATED]: updateHandler,
});
