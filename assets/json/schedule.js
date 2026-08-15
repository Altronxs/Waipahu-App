import scheduleJSON from '@/assets/json/school_schedule.json'
import calendarJSON from '@/assets/json/calendar.json'
import { fetchSchoolEvents } from '@/assets/json/eventService';

const today = new Date()
var todaySchedule = {}

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

// Converts a "HH:MM" time string into total minutes since midnight,
// making start/end times easy to compare numerically
const timeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

const getTodaySchedule = (currentEvents) => {
  // Only look up a schedule on weekdays (Monday - Friday)
  console.log(currentEvents)
  let SCHOOL_SCHEDULE = [];
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
    return SCHOOL_SCHEDULE;
  }
}


/**
 * Converts minutes into a formatted "H:MM" string.
 * @param {number} minutes 
 * @returns {string}
 */
const minutesToString = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const minute = Math.round((minutes / 60 - hours) * 60);
  const paddedMinute = minute < 10 ? "0" + minute : minute;
  return hours + ":" + paddedMinute;
};

/**
 * Calculates current school period details based on the given Date and schedule.
 * @param {Date} now 
 * @param {Array<{name: string, start: number, end: number}>} schedule 
 * @returns {Object} Period status data
 */
export const calculateCurrentPeriod = (now, currentEvents) => {
  const currentMinutes = (now.getHours()-6) * 60 + now.getMinutes();
  const currentSeconds = now.getSeconds();
  
  const activePeriod = getTodaySchedule(currentEvents).find(
    (p) => currentMinutes >= p.start && currentMinutes < p.end
  );

  if (!activePeriod) {
    return {
      currentPeriod: 'School is Out',
      currentPeriodStart: '',
      currentPeriodEnd: '',
      timeLeft: '',
      loadingBarFactor: '0%',
      isSchoolHours: false,
    };
  }
  if (!currentEvents) {
    return {
      currentPeriod: 'Loading...',
      currentPeriodStart: '',
      currentPeriodEnd: '',
      timeLeft: '',
      loadingBarFactor: '0%',
      isSchoolHours: false,
    };
  }

  // Format start time
  let currentPeriodStart = '';
  if (activePeriod.start >= 780) {
    currentPeriodStart = minutesToString(activePeriod.start - 720);
  } else {
    currentPeriodStart = minutesToString(activePeriod.start);
  }

  // Format end time
  let currentPeriodEnd = '';
  if (activePeriod.end >= 720) {
    if (activePeriod.end >= 780) {
      currentPeriodEnd = minutesToString(activePeriod.end - 720) + "pm";
    } else {
      currentPeriodEnd = minutesToString(activePeriod.end) + "pm";
    }
  } else {
    currentPeriodEnd = minutesToString(activePeriod.end) + "am";
  }

  // Calculate remaining time
  const minutesRemaining = activePeriod.end - currentMinutes - 1;
  const secondsRemaining = 60 - currentSeconds;
  const displaySeconds = secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;
  const timeLeft = `${minutesRemaining}m ${displaySeconds}s`;

  // Calculate progress bar percentage
  const totalDuration = activePeriod.end - activePeriod.start;
  const timeElapsed = totalDuration - (minutesRemaining + secondsRemaining / 60);
  const progressPercent = 100 * (timeElapsed / totalDuration);

  const loadingBarFactor = progressPercent >= 5 ? `${progressPercent}%` : '5%';

  return {
    currentPeriod: activePeriod.name,
    currentPeriodStart,
    currentPeriodEnd,
    timeLeft,
    loadingBarFactor,
    isSchoolHours: true,
  };
}; 

