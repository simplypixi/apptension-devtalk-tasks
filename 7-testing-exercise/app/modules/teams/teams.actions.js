import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getTeams: null,
  getTeamsSuccess: ['payload'],
  getTeamsError: ['payload', 'error'],
  setRangeValues: ['values'],
}, {});

export const teamsActions = Creators;
export const teamsActionsTypes = Types;
