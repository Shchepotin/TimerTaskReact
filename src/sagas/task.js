import { put, takeLatest, select, all, call, delay } from 'redux-saga/effects';

import {
  receiveTasks,
  receiveCurrentTask,
} from '../actions/task';

export function* watchRoot() {
  yield call(initState);
  yield takeLatest('*', syncState);
}

export function* syncState() {
  yield delay(300);

  const { task: { currentItem, items} } = yield select();

  yield call(() => {
    localStorage.setItem('currentTask', JSON.stringify(currentItem));
    localStorage.setItem('tasks', JSON.stringify(items));
  });
}

export function* initState() {
  const currentTask = yield call(() => {
    return JSON.parse(localStorage.getItem('currentTask') || JSON.stringify({
      name: '',
      start: null,
      stop: null,
    }));
  });

  const tasks = yield call(() => {
    return JSON.parse(localStorage.getItem('tasks') || JSON.stringify([]));
  });

  yield put(receiveCurrentTask(currentTask));
  yield put(receiveTasks(tasks));
}

export default function* rootSaga() {
  yield all([
    watchRoot(),
  ]);
}
