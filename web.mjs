import { getCommemorativeDate } from "./common.mjs";

// Elements
const calendarGrid = document.getElementById("calendar-grid");
const monthYearDisplay = document.getElementById("month-year-display");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const modal = document.getElementById("special-day-modal");

// Maps
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

// Current date
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// Load special days
let specialDays = [];
fetch("./days.json")
  .then((res) => res.json())
  .then((data) => {
    specialDays = data;
    generateCalendar();
  });

// Populate year selector
for (let y = 1900; y <= 2100; y++) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = y;
  yearSelect.appendChild(option);
}
monthSelect.value = currentMonth;
yearSelect.value = currentYear;

// Event listeners
prevBtn.addEventListener("click", () => changeMonth(-1));
nextBtn.addEventListener("click", () => changeMonth(1));
monthSelect.addEventListener("change", () => {
  currentMonth = +monthSelect.value;
  generateCalendar();
});
yearSelect.addEventListener("change", () => {
  currentYear = +yearSelect.value;
  generateCalendar();
});

// Modal close
modal.querySelector(".close-btn").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.classList.remove("active");
}

function changeMonth(delta) {
  currentMonth += delta;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;
  generateCalendar();
}

function generateCalendar() {
  calendarGrid.innerHTML = "";
  monthYearDisplay.textContent = `${Object.keys(monthMap)[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Removing empty row
  const totalCells = firstDay + daysInMonth;
  const neededRows = Math.ceil(totalCells / 7);
  const cellsToRender = neededRows * 7;

  // Precompute special days
  const specialsThisMonth = {};
  specialDays.forEach((s) => {
    const sMonth = monthMap[s.monthName];
    const sDayOfWeek = dayMap[s.dayName];
    const sNth = occurrenceMap[s.occurrence];
    const date = getCommemorativeDate(currentYear, sMonth, sDayOfWeek, sNth);
    if (date.getMonth() === currentMonth) {
      specialsThisMonth[date.getDate()] = s;
    }
  });

  let dayCounter = 1;
  for (let i = 0; i < cellsToRender; i++) {
    const cell = document.createElement("div");
    cell.classList.add("day");

    if (i >= firstDay && dayCounter <= daysInMonth) {
      cell.textContent = dayCounter;

      const special = specialsThisMonth[dayCounter];
      if (special) {
        cell.classList.add("special-day");
        const label = document.createElement("div");
        label.textContent = special.name;
        cell.appendChild(label);

        cell.addEventListener("click", () => {
          const date = getCommemorativeDate(
            currentYear,
            currentMonth,
            dayMap[special.dayName],
            occurrenceMap[special.occurrence],
          );
          showModal(
            special.name,
            `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
          );
        });
      }

      dayCounter++;
    }

    calendarGrid.appendChild(cell);
  }
}

function showModal(name, dateStr) {
  modal.querySelector("h3").textContent = name;
  modal.querySelector("p").textContent = dateStr;
  modal.classList.add("active");
}
