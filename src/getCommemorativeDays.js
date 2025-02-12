export function getCommemorativeDays(year, month, events) {
  let specialDays = {};
  events.forEach((event) => {
    if (
      event.monthName.toLowerCase() !==
      new Date(year, month)
        .toLocaleString("default", { month: "long" })
        .toLowerCase()
    )
      return;

    let lastDay = new Date(year, month + 1, 0);
    let dayOccurrences = [];

    for (let d = 1; d <= lastDay.getDate(); d++) {
      let tempDate = new Date(year, month, d);
      if (
        tempDate
          .toLocaleString("default", { weekday: "long" })
          .toLowerCase() === event.dayName.toLowerCase()
      ) {
        dayOccurrences.push(d);
      }
    }

    let eventDay;
    if (event.occurence === "first") {
      eventDay = dayOccurrences[0];
    } else if (event.occurence === "second") {
      eventDay = dayOccurrences[1];
    } else if (event.occurence === "third") {
      eventDay = dayOccurrences[2];
    } else if (event.occurence === "last") {
      eventDay = dayOccurrences[dayOccurrences.length - 1];
    }

    if (eventDay) {
      specialDays[eventDay] = event;
    }
  });
  return specialDays;
}
