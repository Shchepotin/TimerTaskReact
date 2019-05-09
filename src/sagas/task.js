import { put, takeEvery, takeLatest, all, call, delay } from 'redux-saga/effects';

import {
  REQUEST_TASKS,
  REQUEST_TASK,
  REQUEST_CURRENT_TASK,
  START_TASK,
  STOP_TASK,
  DESTROY_TASK,
  GENERATE_RANDOM_TASKS,
  UPDATE_CURRENT_TASK,
  requestTasks,
  receiveTasks,
  failureTasks,
  requestCurrentTask,
  receiveCurrentTask,
  failureCurrentTask,
  receiveTask,
  failureTask,
} from '../actions/task';

import {
  index as taskIndex,
  start as taskStart,
  stop as taskStop,
  current as taskCurrent,
  show as taskShow,
  updateCurrent as taskUpdateCurrent,
  destroy as taskDestroy,
  generateRandomTasks as taskGenerateRandomTasks,
} from '../api/task';

export function* onRequestTasks() {
  try {
    const results = yield call(taskIndex);
    yield put(receiveTasks(results));
  } catch (e) {
    yield put(failureTasks());
  }
}

export function* onGenerateRandomTasks() {
  try {
    yield call(taskGenerateRandomTasks);

    yield put(requestTasks());
  } catch (e) {
    yield put(failureTasks());
  }
}

export function* onRequestTask({ payload }) {
  try {
    const results = yield call(taskShow, payload);
    yield put(receiveTask(results));
  } catch (e) {
    yield put(failureTask());
  }
}

export function* onRequestCurrentTask() {
  try {
    const results = yield call(taskCurrent);
    yield put(receiveCurrentTask(results));
  } catch (e) {
    yield put(failureTasks());
  }
}

export function* onStartTask() {
  try {
    yield call(taskStart);

    yield put(requestCurrentTask());
  } catch (e) {
    yield put(failureCurrentTask());
  }
}

export function* onStopTask() {
  try {
    yield call(taskStop);

    yield put(requestCurrentTask());
    yield put(requestTasks());
  } catch (e) {
    yield put(failureCurrentTask());
  }
}

export function* onUpdateCurrentTask({ payload }) {
  yield delay(300);

  try {
    yield call(taskUpdateCurrent, payload);

    yield put(requestCurrentTask());
  } catch (e) {
    yield put(failureCurrentTask());
  }
}

export function* onDestroyTask({ payload }) {
  yield call(taskDestroy, payload);
  yield put(requestTasks());
}

export function* watchRoot() {
  yield takeEvery(REQUEST_TASKS, onRequestTasks);
  yield takeEvery(REQUEST_TASK, onRequestTask);
  yield takeEvery(REQUEST_CURRENT_TASK, onRequestCurrentTask);
  yield takeEvery(START_TASK, onStartTask);
  yield takeEvery(STOP_TASK, onStopTask);
  yield takeEvery(DESTROY_TASK, onDestroyTask);
  yield takeEvery(GENERATE_RANDOM_TASKS, onGenerateRandomTasks);
  yield takeLatest(UPDATE_CURRENT_TASK, onUpdateCurrentTask);
}

export default function* rootSaga() {
  yield all([
    watchRoot(),
  ]);
}
