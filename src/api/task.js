import { DateTime } from 'luxon';

import getRandom from '../utils/getRandom';

const getNextId = () => {
  let data = JSON.parse(localStorage.getItem('tasks') || initialTasks());

  return (data[data.length - 1] && data[data.length - 1].id + 1) || 1;
};

const initialTasks = () => JSON.stringify([]);

const initialTask = () => JSON.stringify({
  id: getNextId(),
  start: null,
  stop: null,
  name: '',
});

export const index = () => new Promise((resolve) => {
  setTimeout(() => {
    let data = JSON.parse(localStorage.getItem('tasks') || initialTasks());

    resolve(data);
  }, 50);
});

export const show = (payload) => new Promise((resolve, reject) => {
  setTimeout(() => {
    let data = JSON.parse(localStorage.getItem('tasks') || initialTasks());

    const result = data.find(item => item.id === Number(payload.id));

    if (result) {
      resolve(result);
    } else {
      reject();
    }
  }, 50);
});

export const destroy = (payload) => new Promise((resolve) => {
  setTimeout(() => {
    let data = JSON.parse(localStorage.getItem('tasks') || initialTasks());

    localStorage.setItem('tasks', JSON.stringify(data.filter(item => item.id !== Number(payload.id))));

    resolve();
  }, 50);
});

export const current = () => new Promise((resolve) => {
  setTimeout(() => {
    const data = JSON.parse(localStorage.getItem('task') || initialTask());

    resolve(data);
  }, 50);
});

export const start = () => new Promise((resolve) => {
  setTimeout(() => {
    const data = JSON.parse(localStorage.getItem('task') || initialTask());

    localStorage.setItem('task', JSON.stringify({
      ...data,
      start: DateTime.local(),
    }));

    resolve();
  }, 50);
});

export const updateCurrent = (payload) => new Promise((resolve) => {
  setTimeout(() => {
    const data = JSON.parse(localStorage.getItem('task') || initialTask());

    localStorage.setItem('task', JSON.stringify({
      ...data,
      ...payload,
    }));

    resolve();
  }, 50);
});

export const generateRandomTasks = () => new Promise((resolve) => {
  setTimeout(() => {
    let taskId = 1;
    const data = [];
    let startDate = DateTime.fromObject({ hour: 0, minute: 0, second: 0 });
    let stopDate = null;

    while (startDate.toFormat('yyyy-LL-dd') === DateTime.local().toFormat('yyyy-LL-dd')) {
      startDate = startDate.plus({seconds: getRandom(0, 60 * 60 * 1.5)});
      stopDate = startDate.plus({seconds: getRandom(60 * 10, 60 * 60 * 1.5)});

      data.push({
        id: taskId,
        start: startDate.toISO(),
        stop: stopDate.toISO(),
        name: `Task #${taskId}`,
      });

      taskId += 1;

      startDate = stopDate;
    }

    localStorage.setItem('tasks', JSON.stringify(data));

    resolve();
  }, 50);
});

export const stop = () => new Promise((resolve) => {
  setTimeout(() => {
    const task = JSON.parse(localStorage.getItem('task') || initialTask());
    const tasks = JSON.parse(localStorage.getItem('tasks') || initialTasks());

    localStorage.setItem('tasks', JSON.stringify([
      ...tasks,
      {
        ...task,
        stop: DateTime.local(),
      },
    ]));

    localStorage.removeItem('task');

    resolve();
  }, 50);
});
