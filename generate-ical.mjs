import fs from 'fs';
import daysData from "./data/days.json" with { type: "json" };
import {getCommemorativeDays} from './src/getCommemorativeDays.js'

const START_YEAR = 2020;
const END_YEAR = 2030;

// Format date to iCal format (YYYYMMDDTHHmmssZ)
function formatDateToICal(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

// Function to generate the iCal file content
function generateICal() {
  let icalData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Commemorative Days//EN'
  ];

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    for (let month = 0; month < 12; month++) {
      let specialDays = getCommemorativeDays(year, month, daysData);

      Object.entries(specialDays).forEach(([day, event]) => {
        let eventDate = new Date(year, month, parseInt(day));
        let formattedDate = formatDateToICal(eventDate);
        
        icalData.push(
          'BEGIN:VEVENT',
          `SUMMARY:${event.name}`,
          `DTSTART:${formattedDate}`,
          `DTEND:${formattedDate}`,
          `DESCRIPTION:More info at ${event.descriptionURL}`,
          `UID:${event.name.replace(/\s+/g, '')}-${year}@commemorative-days.com`,
          'END:VEVENT'
        );
      });
    }
  }

  icalData.push('END:VCALENDAR');
  return icalData.join('\r\n');
}

const icalContent = generateICal();
fs.writeFileSync('commemorative_daysss.ics', icalContent);
console.log('✅ iCal file saved as commemorative_days.ics');
