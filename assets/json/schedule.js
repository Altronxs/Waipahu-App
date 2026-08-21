// ==========================================
// IMPORTS
// ==========================================
import scheduleJSON from '@/assets/json/school_schedule.json';
import calendarJSON from '@/assets/json/calendar.json';
import { fetchSchoolEvents } from '@/assets/json/eventService';

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
const findCalendarEntryForDate = (inputDate) => {
    // Strip time to focus solely on the calendar day
    const targetTimestamp = new Date(inputDate).setHours(0, 0, 0, 0);

    /**
     * Converts a "MM-DD-YY" string into a midnight timestamp.
     */
    const parseCalendarDateString = (dateStr) => {
        const [month, day, twoDigitYear] = dateStr.split('-').map(Number);
        return new Date(2000 + twoDigitYear, month - 1, day).setHours(0, 0, 0, 0);
    };

    // Find the range that wraps around our target date
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
 * 
 * @param {number} minutes - Total minutes.
 * @returns {string} Formatted time string.
 */
const minutesToString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    const paddedMinute = mins < 10 ? `0${mins}` : mins;
    return `${hours}:${paddedMinute}`;
};

/**
 * Maps a specific Schedule ID into a flat timeline array.
 * 
 * @param {number} scheduleID - Key pointing to a school schedule configuration.
 * @returns {Array} List of processed period objects with minute-converted boundaries.
 */
const buildFinalSchedule = (scheduleID) => {
    const finalTimeline = [];
    
    // IDs 8 and higher signify holidays or exceptions without structured bell schedules
    if (scheduleID < 8 || scheduleID > 8) {
        const structuralSchedule = scheduleJSON.schedule[scheduleID];
        
        // Loop over the raw JSON blocks and format their bounds into absolute minutes
        for (let i = 0; i < structuralSchedule.timeSchedule.length; i++) {
            const period = structuralSchedule.timeSchedule[i];
            finalTimeline[i] = {
                name: period.name,
                start: timeToMinutes(period.start),
                end: timeToMinutes(period.end)
            };
        }
    }
    return finalTimeline;
};

/**
 * Evaluates calendar rules against active real-time events to build the daily matrix.
 * 
 * @param {Object} currentEvents - The event block retrieved for the current day.
 * @param {Date} targetDate - The live date object instance.
 * @returns {Array} Final collection of periods active for the day.
 */
const getTodaySchedule = (currentEvents, targetDate) => {
    const dayOfWeek = targetDate.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday

    // Only process schedules for regular school days (Monday through Friday)
    if (dayOfWeek < 1 || dayOfWeek > 5) {
        return [];
    }

    const calendarEntry = findCalendarEntryForDate(targetDate);
    if (!calendarEntry) return [];

    // Map day to the zero-indexed schedule ID array (Mon = 0, Tue = 1, etc.)
    let scheduleID = calendarEntry.scheduleID[dayOfWeek - 1];
    const allowedValues = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    // Check if the passed API event applies directly to today's date
    if (currentEvents && Number(currentEvents.day) === targetDate.getDate()) {
        const eventNameLower = currentEvents.name.toLowerCase();

        // Helper boolean flags for override evaluation
        const isFridaySchedule = eventNameLower.includes('friday') && eventNameLower.includes('schedule');
        const isAssemblyB = eventNameLower.includes("assembly 'b'");
        const isScheduleC = eventNameLower.includes("schedule c");
        const isHoliday = eventNameLower.includes("holiday") || eventNameLower.includes("no students") || eventNameLower.includes("break");
        

        // Run overrides if the calendar does not already match the event intent
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
            // Logs an exception if manual events clash with structural definitions
            //console.log('Calendar out of sync with holiday event; skipping generation.');
        
            return [];
        }
    }

    if (allowedValues.includes(scheduleID)) {
        const index = allowedValues.indexOf(scheduleID)
        return buildFinalSchedule(9 + index);
    }

    // Default back to standard calendar schedule mapping if no exceptions trip
    return buildFinalSchedule(scheduleID);
};

// ==========================================
// EXPORTED CORE SERVICE
// ==========================================

/**
 * Processes live operational metrics for the current ongoing school block.
 * 
 * @param {Date} now - The system clock date.
 * @param {Object} currentEvents - Live scraped calendar event configuration.
 * @returns {Object} Metric payload feeding UI display components.
 */
export const calculateCurrentPeriod = (now, currentEvents) => {
    // Early exit state: Data still resolving upstream
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

    const currentMinutes = ((now.getHours()) * 60) + now.getMinutes();
    const currentSeconds = now.getSeconds();

    // Query active layout structure and filter down to the timeframe containing the current minute
    const todayActiveSchedule = getTodaySchedule(currentEvents, now);
    const activePeriod = todayActiveSchedule.find(
        (p) => currentMinutes >= p.start && currentMinutes < p.end
    );

    // Early exit state: Not school hours, or in between structured periods
    if (!activePeriod) {
        return {
            currentPeriod: '',
            currentPeriodStart: '',
            currentPeriodEnd: '',
            timeLeft: '',
            loadingBarFactor: '0%',
            isSchoolHours: false,
        };
    }

    // Convert start boundaries into clean, non-military presentation formats
    let currentPeriodStart = '';
    if (activePeriod.start >= 780) { // 1:00 PM or later
        currentPeriodStart = minutesToString(activePeriod.start - 720);
    } else {
        currentPeriodStart = minutesToString(activePeriod.start);
    }

    // Append standard AM/PM designators directly onto localized period ends
    let currentPeriodEnd = '';
    if (activePeriod.end >= 720) { // 12:00 PM or later
        if (activePeriod.end >= 780) {
            currentPeriodEnd = `${minutesToString(activePeriod.end - 720)}pm`;
        } else {
            currentPeriodEnd = `${minutesToString(activePeriod.end)}pm`;
        }
    } else {
        currentPeriodEnd = `${minutesToString(activePeriod.end)}am`;
    }

    // Dynamic Countdown Calculations
    const minutesRemaining = activePeriod.end - currentMinutes - 1;
    const secondsRemaining = 60 - currentSeconds;
    const displaySeconds = secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;
    const timeLeft = `${minutesRemaining}m ${displaySeconds}s`;

    // Visual Loading Bar Component Normalization
    const totalDuration = activePeriod.end - activePeriod.start;
    const timeElapsed = totalDuration - (minutesRemaining + (secondsRemaining / 60));
    const progressPercent = 100 * (timeElapsed / totalDuration);
    
    // Caps minimum width to 5% to ensure visibility even at initial period launch
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
