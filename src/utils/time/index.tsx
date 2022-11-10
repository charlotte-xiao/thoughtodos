const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const formatDate = (date: Date, formatString: string): string => {
  const matchProps = {
    year: date.getFullYear(),
    month: MONTH[date.getMonth()],
    dayOfWeek: DAY_OF_WEEK[date.getDay()],
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
  Object.entries(matchProps).forEach((value) => {
    formatString = formatString.replaceAll(
      `{${value[0]}}`,
      value[1].toString()
    );
  });
  return formatString;
};
