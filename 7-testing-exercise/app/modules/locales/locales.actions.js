import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setLanguage: ['payload'],
}, {});

export const localesActions = Creators;
console.log();
export const localesActionsTypes = Types;
console.log(localesActionsTypes);
