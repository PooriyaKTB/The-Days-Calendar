import { renderCalendar } from "./src/renderCalendar.js";
import { updateMonthInput } from "./src/updateMonthInput.js";
import daysData from "./data/days.json" with { type: "json" };

const monthInput = document.querySelector("#month-year");

document.addEventListener("DOMContentLoaded", function () {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  updateMonthInput(monthInput, currentYear, currentMonth)
  
  // Add an event listener to the "Previous" button 
  document.getElementById("prev").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateMonthInput(monthInput, currentYear, currentMonth);
    renderCalendar(currentYear, currentMonth, daysData);
  });

  // Add an event listener to the "Next" button 
  document.getElementById("next").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    updateMonthInput(monthInput, currentYear, currentMonth);
    renderCalendar(currentYear, currentMonth, daysData);
  });

  // Add an event listener to the month input 
  monthInput.addEventListener("input", () => {
    let [year, month] = monthInput.value.split("-").map(Number);
    currentYear = year;
    currentMonth = month - 1;
    renderCalendar(currentYear, currentMonth, daysData);
  });

  renderCalendar(currentYear, currentMonth, daysData);
})
