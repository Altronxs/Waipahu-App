// ==========================================
// IMPORTS
// ==========================================
import scheduleJSON from '@/assets/json/school_schedule.json';
import calendarJSON from '@/assets/json/calendar.json';

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Finds the calendar entry containing a specific date.
 * Maps the target date to an academic week/period definition.
 *
 * @param {Date} inputDate - The date to search for.
 * @returns {Object|null} The matching calendar entry object or null.
 */
export const findCalendarEntryForDate = (inputDate) => {
    // Strip time so we're only comparing calendar days, not times.
    const targetTimestamp = new Date(inputDate).setHours(0, 0, 0, 0);

    /**
     * Converts a "MM-DD-YY" string into a midnight timestamp.
     */
    const parseCalendarDateString = (dateStr) => {
        const [month, day, twoDigitYear] = dateStr.split('-').map(Number);
        return new Date(2000 + twoDigitYear, month - 1, day).setHours(0, 0, 0, 0);
    };

    // Find the date range (start/end) that contains our target date.
    return calendarJSON.calendar.find(entry => {
        const rangeStart = parseCalendarDateString(entry.start);
        const rangeEnd = parseCalendarDateString(entry.end);
        return targetTimestamp >= rangeStart && targetTimestamp <= rangeEnd;
    }) || null;
};

/**
 * Converts a 24-hour "HH:MM" time string into total minutes since midnight.
 * This makes period comparisons straightforward using simple numbers.
 *
 * @param {string} timeString - "HH:MM" formatted string.
 * @returns {number} Minutes since midnight.
 */
const timeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
};

/**
 * Converts total minutes back into a standard "H:MM" clock string.
 * NOTE: this does not add an "am"/"pm" suffix — callers append that
 * themselves (see calculateCurrentPeriod), and currently only do so
 * for the period *end* time, not the start time. Worth confirming
 * that's intentional, since it makes the two labels inconsistent.
 *
 * @param {number} minutes - Total minutes.
 * @returns {string} Formatted time string, e.g. "9:05".
 */
const minutesToString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    const paddedMinute = mins < 10 ? `0${mins}` : mins;
    return `${hours}:${paddedMinute}`;
};

/**
 * Empty timeline shape, returned whenever there is no school-day
 * schedule to report (weekends, holidays, unmatched calendar dates).
 * Kept as a shared constant so every "no schedule" branch returns the
 * same shape as buildFinalSchedule() below.
 */
const EMPTY_SCHEDULE = { finalTimeline: [], scheduleID: null };

/**
 * Maps a specific Schedule ID into a flat timeline array.
 *
 * @param {number} scheduleID - Key pointing to a school schedule configuration.
 * @returns {{finalTimeline: Array, scheduleID: number}} Processed period
 *   objects with minute-converted boundaries, alongside the schedule ID.
 */
const buildFinalSchedule = (scheduleID) => {
    const finalTimeline = [];

    // ID 8 signifies a holiday/exception with no structured bell schedule.
    if (scheduleID !== 8) {
        const structuralSchedule = scheduleJSON.schedule[scheduleID];

        // Loop over the raw JSON blocks and format their bounds into absolute minutes.
        for (let i = 0; i < structuralSchedule.timeSchedule.length; i++) {
            const period = structuralSchedule.timeSchedule[i];
            finalTimeline[i] = {
                name: period.name,
                start: timeToMinutes(period.start),
                end: timeToMinutes(period.end)
            };
        }
    }
    return { finalTimeline, scheduleID };
};

/**
 * Evaluates calendar rules against active real-time events to build the
 * daily period timeline.
 *
 * @param {Object} currentEvents - The event block retrieved for the current day.
 * @param {Date} targetDate - The live date object instance.
 * @returns {{finalTimeline: Array, scheduleID: number|string|null}} Timeline
 *   for the day (empty timeline when there's no school, e.g. weekends/holidays).
 */
export const getTodaySchedule = (currentEvents, targetDate) => {
    const dayOfWeek = targetDate.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday

    // Only process schedules for regular school days (Monday through Friday).
    if (dayOfWeek < 1 || dayOfWeek > 5) {
        return EMPTY_SCHEDULE;
    }

    const calendarEntry = findCalendarEntryForDate(targetDate);
    if (!calendarEntry) return EMPTY_SCHEDULE;

    // Map day to the zero-indexed schedule ID array (Mon = 0, Tue = 1, etc.)
    let scheduleID = calendarEntry.scheduleID[dayOfWeek - 1];
    const allowedValues = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

    // Check if the passed API event applies directly to today's date.
    if (currentEvents && Number(currentEvents.day) === targetDate.getDate()) {
        const eventNameLower = currentEvents.name.toLowerCase();

        // Helper boolean flags for override evaluation.
        const isFridaySchedule = eventNameLower.includes('friday') && eventNameLower.includes('schedule');
        const isAssemblyB = eventNameLower.includes("assembly 'b'");
        const isScheduleC = eventNameLower.includes('schedule c');
        const isHoliday = eventNameLower.includes('holiday') || eventNameLower.includes('no students') || eventNameLower.includes('break');

        // Run overrides only if the calendar doesn't already reflect the event's intent.
        if (isFridaySchedule && scheduleID !== '4') {
            return buildFinalSchedule(4);
        }
        if (isAssemblyB && scheduleID !== '6') {
            return buildFinalSchedule(6);
        }
        if (isScheduleC && scheduleID !== '7') {
            return buildFinalSchedule(7);
        }
        if (isHoliday && scheduleID !== '8') {
            // Manual event says "holiday" but the calendar JSON hasn't been
            // updated to match — treat today as having no schedule rather
            // than trusting the (out of sync) calendar data.
            return EMPTY_SCHEDULE;
        }
    }

    // Special/lettered schedules map onto IDs 9+ (a == 9, b == 10, ...).
    if (allowedValues.includes(scheduleID)) {
        const index = allowedValues.indexOf(scheduleID);
        return buildFinalSchedule(9 + index);
    }

    // Default: use the standard numeric schedule ID from the calendar as-is.
    return buildFinalSchedule(scheduleID);
};

// ==========================================
// EXPORTED CORE SERVICE
// ==========================================

/**
 * Shape returned whenever there is nothing to report for "right now"
 * (data still loading, outside school hours, or between periods).
 */
const buildIdleState = () => ({
    currentPeriod: '',
    currentPeriodStart: '',
    currentPeriodEnd: '',
    timeLeft: '',
    loadingBarFactor: '0%',
    isSchoolHours: false,
    scheduleID: '',
    schedule: '',
});

/**
 * Processes live operational metrics for the current ongoing school block.
 *
 * @param {Date} now - The system clock date.
 * @param {Object} currentEvents - Live scraped calendar event configuration.
 * @param {string} overrideID - '' or '-1' to use the normal calendar-derived
 *   schedule; any other value forces that specific schedule ID (dev/testing tool).
 * @returns {Object} Metric payload feeding UI display components.
 */
export const calculateCurrentPeriod = (now, currentEvents, overrideID) => {
    // Early exit: upstream event data hasn't resolved yet.
    if (!currentEvents) {
        return { ...buildIdleState(), currentPeriod: 'Loading...' };
    }

    const dayOfWeek = now.getDay(); // 0 = Sunday ... 6 = Saturday
    const calendarEntry = findCalendarEntryForDate(now);

    const currentMinutes = ((now.getHours() - 0) * 60) + now.getMinutes();
    const currentSeconds = now.getSeconds();

    // Resolve which timeline to use: the live calendar-derived schedule,
    // or a manually forced schedule ID (used for previewing/testing).
    const useOverride = overrideID !== '' && overrideID !== '-1';
    const todaySchedule = useOverride
        ? buildFinalSchedule(Number(overrideID))
        : getTodaySchedule(currentEvents, now);

    const activePeriod = todaySchedule.finalTimeline.find(
        (p) => currentMinutes >= p.start && currentMinutes < p.end
    );

    // NOTE: calendarEntry.scheduleID is the *array* of schedule IDs for the
    // whole week (one per weekday), not the single ID for today. Indexing
    // it by dayOfWeek (as getTodaySchedule does) gives the actual value
    // this payload seems intended to expose to the UI.
    const scheduleID = calendarEntry && dayOfWeek >= 1 && dayOfWeek <= 5
        ? calendarEntry.scheduleID[dayOfWeek - 1]
        : '';

    // Early exit: outside school hours, or in a gap between structured periods.
    if (!activePeriod) {
        return buildIdleState();
    }

    // Convert the period start into a 12-hour display value (no am/pm suffix).
    const currentPeriodStart = activePeriod.start >= 780 // 1:00 PM or later
        ? minutesToString(activePeriod.start - 720)
        : minutesToString(activePeriod.start);

    // Convert the period end into a 12-hour display value with an am/pm suffix.
    let currentPeriodEnd;
    if (activePeriod.end >= 780) { // 1:00 PM or later
        currentPeriodEnd = `${minutesToString(activePeriod.end - 720)}pm`;
    } else if (activePeriod.end >= 720) { // Noon - 12:59 PM
        currentPeriodEnd = `${minutesToString(activePeriod.end)}pm`;
    } else {
        currentPeriodEnd = `${minutesToString(activePeriod.end)}am`;
    }

    // Dynamic countdown calculations.
    // the seconds counter (e.g. "0m 45s" instead of "1m 45s" when only 45
    // seconds remain in the current minute).
    const minutesRemaining = activePeriod.end - currentMinutes;
    const secondsRemaining = 60 - currentSeconds;
    const displaySeconds = secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;
    const timeLeft = `${minutesRemaining}m ${displaySeconds}s`;

    // Visual loading bar normalization (0-100%).
    const totalDuration = activePeriod.end - activePeriod.start;
    const timeElapsed = totalDuration - (minutesRemaining + (secondsRemaining / 60));
    const progressPercent = 100 * (timeElapsed / totalDuration);

    // Caps minimum width to 5% to ensure visibility even at initial period launch.
    const loadingBarFactor = progressPercent >= 5 ? `${progressPercent}%` : '5%';

    return {
        currentPeriod: activePeriod.name,
        currentPeriodStart,
        currentPeriodEnd,
        timeLeft,
        loadingBarFactor,
        isSchoolHours: true,
        scheduleID,
        schedule: scheduleJSON.schedule[todaySchedule.scheduleID].day,
    };
};