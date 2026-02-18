
// Helper function that calculate the Nth of a week day in a month.
export function getNthWeekday(year, month, dayOfWeek, n) {
  const firstDay = new Date(year, month, 1, 12, 0, 0);

  let differenceDay = dayOfWeek - firstDay.getDay();

  if (differenceDay < 0) {
    differenceDay += 7;
  }

  const dateNumber = 1 + differenceDay + (n - 1) * 7;
  return new Date(year, month, dateNumber);
}

//Helper function to find last week day in a month.
function getLastWeekday(year, month, dayOfWeek) {
  const lastDay = new Date(year, month + 1, 0, 12, 0, 0);

  let difference = lastDay.getDay() - dayOfWeek;

  if (difference < 0) {
    difference += 7;
  }

  const finalDateNumber = lastDay.getDate() - difference;

  return new Date(year, month, finalDateNumber);
}

// main function that use n to decide which helper function to use based on the n.
export function getCommemorativeDate(year, month, dayOfWeek, n) {
  if (n === -1) {
    return getLastWeekday(year, month, dayOfWeek);
  }
  return getNthWeekday(year, month, dayOfWeek, n);
}
