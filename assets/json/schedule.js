
const timeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

export const SCHOOL_SCHEDULE = [
  { name: 'Period 1', start: timeToMinutes('08:00'), end: timeToMinutes('08:50') },
  { name: 'Period 2', start: timeToMinutes('08:55'), end: timeToMinutes('09:45') },
  { name: 'Passing Period', start: timeToMinutes('09:45'), end: timeToMinutes('09:55') },
  { name: 'Period 3', start: timeToMinutes('09:55'), end: timeToMinutes('10:45') },
  { name: 'Lunch', start: timeToMinutes('10:45'), end: timeToMinutes('11:25') },
  { name: 'Period 4', start: timeToMinutes('11:30'), end: timeToMinutes('12:20') },
];
