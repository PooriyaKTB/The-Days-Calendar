import { renderCalendar } from "./renderCalendar.js";

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON file containing the commemorative days data
  fetch("days.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the current date, year, and month
      let currentDate = new Date();
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth();

      // Create an input element for selecting the month and year
      let monthInput = document.createElement("input");
      monthInput.type = "month";
      monthInput.id = "month-year";
      monthInput.value = `${currentYear}-${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}`;
      monthInput.style.fontSize = "1.5rem";

      let oldHeader = document.getElementById("month-year");
      oldHeader.replaceWith(monthInput);

      // Add an event listener to the "Previous" button to navigate to the previous month
      document.getElementById("prev").addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        updateMonthInput();
        renderCalendar(currentYear, currentMonth, data);
      });

      // Add an event listener to the "Next" button to navigate to the next month
      document.getElementById("next").addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
        updateMonthInput();
        renderCalendar(currentYear, currentMonth, data);
      });

      // Add an event listener to the month input to handle manual month/year selection
      monthInput.addEventListener("input", () => {
        let [year, month] = monthInput.value.split("-").map(Number);
        currentYear = year;
        currentMonth = month - 1;
        renderCalendar(currentYear, currentMonth, data);
      });

      function updateMonthInput() {
        monthInput.value = `${currentYear}-${(currentMonth + 1)
          .toString()
          .padStart(2, "0")}`;
      }

      renderCalendar(currentYear, currentMonth, data);
    })
    .catch((error) => console.error("Error loading days.json:", error));
});
