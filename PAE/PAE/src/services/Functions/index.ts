export const getHoursBetweenDates = (date1: Date, date2: Date) => {
  return Math.abs(date1.valueOf() - date2.valueOf()) / 36e5;
};

export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export function getDayName(date: Date, locale: string) {
  return date.toLocaleDateString(locale, { weekday: "long" });
}

export function isSameDayByName(date1: Date, dayName: string): boolean {
  return getDayName(date1, "mx-MX") === dayName;
}
