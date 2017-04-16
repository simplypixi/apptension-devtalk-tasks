import { call, put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import envConfig from '../../environment/base';

import request from '../../utils/request';
import { teamsActions, teamsActionsTypes } from './teams.actions';


export function* fetchTeamsSaga() {
  const sagaFetchingOptions = {
    method: 'GET',
    headers: {
      'X-Auth-Token': envConfig.api.key,
    },
  };

  try {
    const data = yield call(request, `${envConfig.api.baseUrl}${envConfig.api.urls.teams}`, sagaFetchingOptions);
    yield put(teamsActions.getTeamsSuccess(data));
  } catch (e) {
    yield put(teamsActions.getTeamsError(e));
  }
}

export function* getTeamsSaga() {
  try {
    yield call(takeLatest, teamsActionsTypes.GET_TEAMS, fetchTeamsSaga);
  } catch (e) {
    yield put(teamsActions.getTeamsError(e));
  }
}

export default function* teamsSaga() {
  yield [
    fork(getTeamsSaga),
  ];
}
