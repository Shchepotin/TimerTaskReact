import { all } from 'redux-saga/effects';

import task from './task';

export default function* rootSaga() {
  yield all([
    task(),
  ]);
}
