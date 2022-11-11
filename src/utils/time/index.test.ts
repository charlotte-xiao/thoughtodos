import { formatDate } from "./index";

describe("time utils", () => {
  test("should format time when given correct time and format string", () => {
    const date = new Date("2022-11-01T00:00:00.000");
    const formatString =
      "{dayOfWeek} {month} {day} {year} {hours}:{minutes}:{seconds}";

    const formatDateString = formatDate(date, formatString);

    expect(formatDateString).toBe("Tuesday November 1 2022 0:0:0");
  });
});
