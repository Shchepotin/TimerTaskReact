import { DateTime, Interval } from 'luxon';

const fromISOToDate = (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd');

const splitTasksByTime = (tasks) => {
  return Array.from({ length: 24 }, (item, index) => ({
      name: index,
      value: Math.floor(tasks
        .map(item => ({
          ...item,
          start: fromISOToDate(item.stop) === DateTime.local().toFormat('yyyy-MM-dd')
            && fromISOToDate(item.start) !== fromISOToDate(item.stop)
              ? DateTime.fromObject({ hour: 0, minute: 0, second: 0 }).toISO() : item.start,
        }))
        .filter(item => fromISOToDate(item.start) === DateTime.local().toFormat('yyyy-MM-dd'))
        .map((item) => {
          const results = {};
          let time = DateTime.fromISO(item.start);
          const stopTime = DateTime.fromISO(item.stop);
          const startDate = time.toFormat('yyyy-MM-dd');

          while (time <= stopTime) {
            if (time.hour === stopTime.hour) {
              results[time.hour] = Number(Interval.fromDateTimes(time, stopTime).toDuration().toFormat('s'));
            } else {
              results[time.hour] = Number(Interval
                .fromDateTimes(time, DateTime.fromObject({ day: time.day, hour: time.hour + 1 }))
                .toDuration().toFormat('s'));
            }

            time = time.plus({ minutes: (60 - time.minute) }).set({ seconds: 0, milliseconds: 0 });

            if (startDate !== time.toFormat('yyyy-MM-dd')) {
              break;
            }
          }

          return results;
        }).reduce((accumulator, value) => accumulator + (value[index] || 0), 0) / 60),
    }));
};

export default splitTasksByTime;
