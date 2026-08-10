import scheduleJSON from '@/assets/json/school_schedule.json'
import calendarJSON from '@/assets/json/calendar.json'

const today = new Date()
var todaySchedule = {}
var SCHOOL_SCHEDULE = []
const dayOfWeek = today.getDay() // 0 = Sunday, 1 = Monday, ... 6 = Saturday

/**
 * Finds the calendar entry (e.g. a week/period definition) whose date range
 * contains the given date.
 */
const findCalendarEntryForDate = (inputDate) => {
  const targetTimestamp = new Date(inputDate).setHours(0, 0, 0, 0);

  // Calendar dates are stored as "MM-DD-YY" strings; convert to a comparable timestamp
  const parseCalendarDateString = (dateStr) => {
    const [month, day, twoDigitYear] = dateStr.split('-').map(Number);
    return new Date(2000 + twoDigitYear, month - 1, day).setHours(0, 0, 0, 0);
  };

  return calendarJSON.calendar.find(entry => {
    const rangeStart = parseCalendarDateString(entry.start);
    const rangeEnd = parseCalendarDateString(entry.end);
    return targetTimestamp >= rangeStart && targetTimestamp <= rangeEnd;
  }) || null;
};


// Only look up a schedule on weekdays (Monday - Friday)
if (dayOfWeek >= 1 && dayOfWeek <= 5) {
  const calendarEntry = findCalendarEntryForDate(today)
  // scheduleID is an array indexed by weekday (Mon = index 0 ... Fri = index 4)
  const scheduleID = calendarEntry.scheduleID[dayOfWeek - 1]

  // scheduleID Values of 0-7 correspond to valid schedule entries in school_schedule.json
  // scheduleID values of 8+ could be added to add special schedules (e.g. for holidays, testing days, etc.) in the future
  if (scheduleID < 8) {
    todaySchedule = scheduleJSON.schedule[scheduleID]
  }

  // Build the final schedule as a flat array of { name, start, end } periods,
  // with start/end converted to minutes-since-midnight for easy comparisons
  for (let i = 0; i < todaySchedule.timeSchedule.length; i++) {
    const period = todaySchedule.timeSchedule[i];
    SCHOOL_SCHEDULE[i] = {
      name: period.name,
      start: timeToMinutes(period.start),
      end: timeToMinutes(period.end)
    }
  }
}

// Converts a "HH:MM" time string into total minutes since midnight,
// making start/end times easy to compare numerically
const timeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

export { SCHOOL_SCHEDULE };
