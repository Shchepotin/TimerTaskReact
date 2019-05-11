import {DateTime} from "luxon";
import getRandom from "./getRandom";

const generateRandomTasks = () => {
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

  return data;
};

export default generateRandomTasks;
