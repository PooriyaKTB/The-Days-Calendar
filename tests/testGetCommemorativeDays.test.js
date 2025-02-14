import { getCommemorativeDays } from "../src/getCommemorativeDays.js";
import daysData from "../data/days.json" with { type: "json" };

describe("getCommemorativeDays", () => {

  test("returns the correct commemorative day for October 2024", () => {
    const year = 2024;
    const month = 9; 
    const specialDays = getCommemorativeDays(year, month, daysData);

    expect(specialDays).toHaveProperty("8"); 
    expect(specialDays["8"].name).toEqual("Ada Lovelace Day");
  });

  test("returns the correct commemorative day for September 2025", () => {
    const year = 2025;
    const month = 8; 
    const specialDays = getCommemorativeDays(year, month, daysData);

    expect(specialDays).toHaveProperty("6"); 
    expect(specialDays["6"].name).toEqual("International Vulture Awareness Day");
  });

  test("returns an empty object when there are no events for a given month", () => {
    const year = 2024;
    const month = 0;
    const specialDays = getCommemorativeDays(year, month, daysData);

    expect(specialDays).toEqual({});
  });
});
