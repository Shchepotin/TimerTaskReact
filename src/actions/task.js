export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const RECEIVE_TASK = 'RECEIVE_TASK';
export const RECEIVE_CURRENT_TASK = 'RECEIVE_CURRENT_TASK';
export const UPDATE_CURRENT_TASK = 'UPDATE_CURRENT_TASK';
export const RESET_INDICATORS = 'RESET_INDICATORS';
export const START_TASK = 'START_TASK';
export const STOP_TASK = 'STOP_TASK';
export const DESTROY_TASK = 'DESTROY_TASK';
export const GENERATE_RANDOM_TASKS = 'GENERATE_RANDOM_TASKS';

export const receiveTasks = (payload) => {
  return { type: RECEIVE_TASKS, payload };
};

export const receiveTask = (payload) => {
  return { type: RECEIVE_TASK, payload };
};

export const receiveCurrentTask = (payload) => {
  return { type: RECEIVE_CURRENT_TASK, payload };
};

export const updateCurrentTask = (payload) => {
  return { type: UPDATE_CURRENT_TASK, payload };
};

export const startTask = (payload) => {
  return { type: START_TASK, payload };
};

export const stopTask = (payload) => {
  return { type: STOP_TASK, payload };
};

export const destroyTask = (payload) => {
  return { type: DESTROY_TASK, payload };
};

export const generateRandomTasks = () => {
  return { type: GENERATE_RANDOM_TASKS };
};

export const resetIndicators = () => {
  return { type: RESET_INDICATORS };
};
