export default function getCalendarMonthWeeks(month, enableOutsideDays) {
  // set utc offset to get correct dates in future (when timezone changes)
  const baseDate = month.clone().utcOffset(month.utcOffset());
  const firstOfMonth = baseDate.clone().startOf('month');
  const lastOfMonth = baseDate.clone().endOf('month');

  const currentDay = firstOfMonth.clone();
  let currentWeek = [];
  const weeksInMonth = [];

  // days belonging to the previous month
  for (let i = 0; i < currentDay.weekday(); i++) {
    const prevDay = enableOutsideDays && currentDay.clone().subtract(i + 1, 'day');
    currentWeek.unshift(prevDay);
  }

  while (currentDay < lastOfMonth) {
    currentWeek.push(currentDay.clone());
    currentDay.add(1, 'd');

    if (currentDay.weekday() === 0) {
      weeksInMonth.push(currentWeek);
      currentWeek = [];
    }
  }

  // days belonging to the next month
  for (let k = currentDay.weekday(), count = 0; k < 7; k++, count++) {
    const nextDay = enableOutsideDays && currentDay.clone().add(count, 'day');
    currentWeek.push(nextDay);
  }

  weeksInMonth.push(currentWeek);

  return weeksInMonth;
}
