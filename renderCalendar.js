import { getCommemorativeDays } from "./getCommemorativeDays.mjs";

function renderCalendar(year, month, events) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  // Create header elements for the days of the week
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  weekdays.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.classList.add("header");
    dayElement.textContent = day;
    grid.appendChild(dayElement);
  });

  // Get the first and last day of the month, and the number of days in the month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  let startingDay = firstDay.getDay();
  if (startingDay === 0) startingDay = 6;
  else startingDay--;

  // Get the commemorative days for the current month
  let commemorativeDays = getCommemorativeDays(year, month, events);

  // Add empty divs for the days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("day", "empty");
    grid.appendChild(emptyDay);
  }

  const specialDaysContainer = document.getElementById("special-days");
  specialDaysContainer.innerHTML = "";

  // Loop through each day of the month and create a div for it
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = day;

    // If the day is a commemorative day, add a special class and tooltip
    if (commemorativeDays[day]) {
      dayElement.classList.add("commemorative");
      dayElement.title = commemorativeDays[day].name;

      // Add the commemorative day to the special days container
      const specialDayElement = document.createElement("div");
      specialDayElement.textContent = `${
        commemorativeDays[day].name
      } - ${day} ${new Date(year, month).toLocaleString("default", {
        month: "long",
      })}`;
      specialDaysContainer.appendChild(specialDayElement);

      // Add a click event listener to fetch and display the event description
      dayElement.addEventListener("click", () => {
        fetch(commemorativeDays[day].descriptionURL)
          .then((response) => response.text())
          .then((text) => {
            alert(text);
          })
          .catch((error) =>
            console.error("Error fetching description:", error)
          );
      });
    }
    grid.appendChild(dayElement);
  }
}

export { renderCalendar };
