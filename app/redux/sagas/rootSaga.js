import { all } from 'redux-saga/effects';
import { userSagas } from './UserSagas';
import { authSagas } from './AuthSagas';
import { accountsSagas } from './AccountsSagas';

const sagas = [authSagas, userSagas, accountsSagas];

export default function* rootSaga() {
  try {
    yield all(sagas);
  } catch (error) {
    console.log(error);
  }
}
