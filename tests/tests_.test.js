import { updateMonthInput } from "../updateMonthInput.js";

describe("updateMonthInput", () => {
  let monthInput;

  beforeEach(() => {
    monthInput = { value: "" };
  });

  test("sets month to '2024-01' for January", () => {
    updateMonthInput(monthInput, 2024, 0);
    expect(monthInput.value).toBe("2024-01");
  });

  test("sets month to '2025-12' for December", () => {
    updateMonthInput(monthInput, 2025, 11);
    expect(monthInput.value).toBe("2025-12");
  });
});
