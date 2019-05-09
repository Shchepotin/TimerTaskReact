export const REQUEST_TASKS = 'REQUEST_TASKS';
export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const FAILURE_TASKS = 'FAILURE_TASKS';
export const REQUEST_TASK = 'REQUEST_TASK';
export const RECEIVE_TASK = 'RECEIVE_TASK';
export const FAILURE_TASK = 'FAILURE_TASK';
export const REQUEST_CURRENT_TASK = 'REQUEST_CURRENT_TASK';
export const RECEIVE_CURRENT_TASK = 'RECEIVE_CURRENT_TASK';
export const FAILURE_CURRENT_TASK = 'FAILURE_CURRENT_TASK';
export const UPDATE_CURRENT_TASK = 'UPDATE_CURRENT_TASK';
export const START_TASK = 'START_TASK';
export const STOP_TASK = 'STOP_TASK';
export const DESTROY_TASK = 'DESTROY_TASK';
export const GENERATE_RANDOM_TASKS = 'GENERATE_RANDOM_TASKS';

export const requestTasks = () => {
  return { type: REQUEST_TASKS };
};

export const receiveTasks = (payload) => {
  return { type: RECEIVE_TASKS, payload };
};

export const failureTasks = () => {
  return { type: FAILURE_TASKS };
};

export const requestTask = (payload) => {
  return { type: REQUEST_TASK, payload };
};

export const receiveTask = (payload) => {
  return { type: RECEIVE_TASK, payload };
};

export const failureTask = () => {
  return { type: FAILURE_TASK };
};

export const requestCurrentTask = () => {
  return { type: REQUEST_CURRENT_TASK };
};

export const receiveCurrentTask = (payload) => {
  return { type: RECEIVE_CURRENT_TASK, payload };
};

export const failureCurrentTask = () => {
  return { type: FAILURE_CURRENT_TASK };
};

export const updateCurrentTask = (payload) => {
  return { type: UPDATE_CURRENT_TASK, payload };
};

export const startTask = () => {
  return { type: START_TASK };
};

export const stopTask = () => {
  return { type: STOP_TASK };
};

export const destroyTask = (payload) => {
  return { type: DESTROY_TASK, payload };
};

export const generateRandomTasks = () => {
  return { type: GENERATE_RANDOM_TASKS };
};
