import { DateTime } from 'luxon';
import splitTasksByTime from '../utils/splitTasksByTime';

describe('Split tasks by time', () => {
  it('Task started at 8:15 and stop at 8:35', () => {
    const result = splitTasksByTime([
      {
        id: 1,
        name: 'Task name',
        start: DateTime.fromObject({ hour: 8, minute: 15 }).toISO(),
        stop: DateTime.fromObject({ hour: 8, minute: 35 }).toISO(),
      }
    ]);

    expect(result[8].value).toBe(20);
  });

  it('Task started at 9:20 and stop at 10:15', () => {
    const result = splitTasksByTime([
      {
        id: 1,
        name: 'Task name',
        start: DateTime.fromObject({ hour: 9, minute: 20 }).toISO(),
        stop: DateTime.fromObject({ hour: 10, minute: 15 }).toISO(),
      }
    ]);

    expect(result[9].value).toBe(40);
    expect(result[10].value).toBe(15);
  });

  it('Task started at 10:45 and stop at 12:25', () => {
    const result = splitTasksByTime([
      {
        id: 1,
        name: 'Task name',
        start: DateTime.fromObject({ hour: 10, minute: 45 }).toISO(),
        stop: DateTime.fromObject({ hour: 12, minute: 25 }).toISO(),
      }
    ]);

    expect(result[10].value).toBe(15);
    expect(result[11].value).toBe(60);
    expect(result[12].value).toBe(25);
  });

  it('Task started yesterday at 22:20 and stop today at 02:15', () => {
    const result = splitTasksByTime([
      {
        id: 1,
        name: 'Task name',
        start: DateTime.fromObject({ hour: 22, minute: 20 }).minus({ day: 1 }).toISO(),
        stop: DateTime.fromObject({ hour: 2, minute: 15 }).toISO(),
      }
    ]);

    expect(result[0].value).toBe(60);
    expect(result[1].value).toBe(60);
    expect(result[2].value).toBe(15);
    expect(result[22].value).toBe(0);
    expect(result[23].value).toBe(0);
  });

  it('Task started today at 22:30 and stop tomorrow at 02:35', () => {
    const result = splitTasksByTime([
      {
        id: 1,
        name: 'Task name',
        start: DateTime.fromObject({ hour: 22, minute: 30 }).toISO(),
        stop: DateTime.fromObject({ hour: 2, minute: 35 }).plus({ day: 1 }).toISO(),
      }
    ]);

    expect(result[22].value).toBe(30);
    expect(result[23].value).toBe(60);
    expect(result[0].value).toBe(0);
    expect(result[1].value).toBe(0);
    expect(result[2].value).toBe(0);
  });

  it('First task 22:00:00 - 22:00:30, second task 22:00:31 - 22:01:02', () => {
    const result = splitTasksByTime([
      {
        id: 1,
        name: 'Task name 1',
        start: DateTime.fromObject({ hour: 22, minute: 0, second: 0 }).toISO(),
        stop: DateTime.fromObject({ hour: 22, minute: 0, second: 30 }).toISO(),
      },
      {
        id: 2,
        name: 'Task name 2',
        start: DateTime.fromObject({ hour: 22, minute: 0, second: 31 }).toISO(),
        stop: DateTime.fromObject({ hour: 22, minute: 1, second: 2 }).toISO(),
      }
    ]);

    expect(result[22].value).toBe(1);
  });
});
