import teamsSaga from './teams/teams.sagas';

export default function* rootSaga() {
  yield [
    teamsSaga(),
  ];
}
