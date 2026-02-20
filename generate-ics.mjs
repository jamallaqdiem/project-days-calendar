import fs from "fs";
import { getCommemorativeDate } from "./common.mjs";

// Maps for month, day, and occurrence
const monthMap = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const dayMap = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const occurrenceMap = { first: 1, second: 2, third: 3, fourth: 4, last: -1 };

// ---------------- LOAD JSON ----------------
const daysData = JSON.parse(fs.readFileSync("./days.json", "utf-8"));

// ---------------- GENERATE ICS EVENTS ----------------
const events = daysData.flatMap((day) => {
  return Array.from({ length: 11 }, (_, i) => {
    const year = 2020 + i;
    const month = monthMap[day.monthName];
    const weekday = dayMap[day.dayName];
    const occurrence = occurrenceMap[day.occurrence];

    const date = getCommemorativeDate(year, month, weekday, occurrence);

    // Format date as YYYYMMDD
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const formatted = `${y}${m}${d}`;

    // Each event is a WHOLE DAY event
    return `
BEGIN:VEVENT
SUMMARY:${day.name}
DTSTART;VALUE=DATE:${formatted}
DTEND;VALUE=DATE:${formatted}
END:VEVENT
`.trim();
  });
});

// ---------------- WRAP IN VCALENDAR ----------------
const icsContent = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "CALSCALE:GREGORIAN",
  ...events,
  "END:VCALENDAR",
].join("\r\n");

// ---------------- WRITE TO FILE ----------------
fs.writeFileSync("./days.ics", icsContent);
