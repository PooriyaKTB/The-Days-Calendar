export function updateMonthInput(monthInput, currentYear, currentMonth) {
  monthInput.value = `${currentYear}-${(currentMonth + 1)
    .toString()
    .padStart(2, "0")}`;
}
