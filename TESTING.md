TESTING - DAYS CALENDAR PROJECT
Group size: 2
========================================

CURRENT MONTH DISPLAY ON LOAD
We opened the website and confirmed that the calendar automatically displays the current month and year.
The correct number of days and weekday alignment is shown.

NAVIGATION BUTTONS (PREVIOUS / NEXT)
We clicked the Previous and Next buttons repeatedly, including across year boundaries.
The calendar updates correctly without showing undefined, NaN, or blank labels.

MONTH AND YEAR DROPDOWN SELECTORS
We selected various months and years using the dropdowns.
The calendar updates immediately and shows the correct days and special events.

DAYS FROM days.json APPEAR CORRECTLY
We verified that special days like Ada Lovelace Day, World Lemur Day, and International Binturong Day appear on the correct dates for multiple years.
Clicking a special day opens a modal with the day’s name and date.

CALENDAR UPDATES CORRECTLY IF days.json IS CHANGED
We added a new commemorative day to days.json and refreshed the page.
The new day appeared in the correct month automatically without modifying code.

CORRECT MONTH LAYOUT
We checked multiple months, including:

- October 2024 → 5 rows × 7 columns, first and last row correctly padded, special days correct.
- October 2020 → special days appear on correct dates.
- May 2030 → International Binturong Day appears correctly.

ACCESSIBILITY SCORE
We ran Lighthouse in Chrome DevTools on multiple months.
All pages scored 100 in Accessibility.

UNIT TESTS
Unit tests in common.test.js verify:

- getNthWeekday() returns the correct nth weekday for a given month and year
- getLastWeekday() returns the correct last weekday
  All tests pass using `npm test`.

ICS FILE GENERATION
We ran `node generic.ics.js` and confirmed a file days.ics was created.
Importing it into Google Calendar showed all special days on the correct dates for years 2020–2030.

ICS EVENTS AS WHOLE-DAY EVENTS
We updated generic.ics.js so that DTEND = DTSTART + 1 day, ensuring events are treated as whole-day events.
No other changes were made to the logic.
