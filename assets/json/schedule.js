import scheduleJSON from '@/assets/json/school_schedule.json'

const timeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

const schedule = 'monday'
const todaySchedule = scheduleJSON.schedule.find(
  (p) => p.day == schedule
);
var SCHOOL_SCHEDULE = []
for (let i = 0; todaySchedule.timeSchedule.length > i; i++) {
  SCHOOL_SCHEDULE[i] = { 
    name: todaySchedule.timeSchedule[i].name, 
    start: timeToMinutes(todaySchedule.timeSchedule[i].start), 
    end: timeToMinutes(todaySchedule.timeSchedule[i].end)
  }
}

export { SCHOOL_SCHEDULE };
