import { Page } from '../domain/Page';

const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const DAY_OF_WEEK = {
  sun: 'SUNDAY',
  mon: 'MONDAY',
  tue: 'TUESDAY',
  wed: 'WEDNESDAY',
  thu: 'THURSDAY',
  fri: 'FRIDAY',
  sat: 'SATURDAY',
};

const convertToHoursObj = (
  day,
  idx,
  openTime = '09:00',
  closeTime = '17:00',
  closed = true,
  byAppointmentOnly = false
) => ({
  day: DAY_OF_WEEK[day],
  dayOfWeek: idx,
  openTime,
  closeTime,
  byAppointmentOnly,
  closed,
});

const buildHours = (fbHours = {}) => {
  const hours: Page.Hour[] = [];

  if (Object.keys(fbHours).length === 0) {
    return hours;
  }

  days.forEach((day, idx) => {
    const dayHours = Object.keys(fbHours).filter(period => period.slice(0, 3) === day);
    const closeHour = dayHours.find(dayHour => dayHour?.slice(-3) === 'close');
    const openHour = dayHours.find(dayHour => dayHour?.slice(-3) === 'open');

    hours.push(
      convertToHoursObj(
        day,
        idx,
        openHour ? fbHours[openHour] : undefined,
        closeHour ? fbHours[closeHour] : undefined,
        false
      )
    );
  });

  return hours;
};

export { buildHours };
