// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Fetch the JSON file containing the commemorative days data
    fetch('days.json')
        .then(response => response.json())
        .then(data => {
            // Get the current date, year, and month
            let currentDate = new Date();
            let currentYear = currentDate.getFullYear();
            let currentMonth = currentDate.getMonth();

            // Create an input element for selecting the month and year
            let monthInput = document.createElement("input");
            monthInput.type = "month";
            monthInput.id = "month-year";
            monthInput.value = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}`;
            monthInput.style.fontSize = "1.5rem";

            let oldHeader = document.getElementById("month-year");
            oldHeader.replaceWith(monthInput);

            // Add an event listener to the "Previous" button to navigate to the previous month
            document.getElementById('prev').addEventListener('click', () => {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                updateMonthInput();
                renderCalendar(currentYear, currentMonth, data);
            });

            // Add an event listener to the "Next" button to navigate to the next month
            document.getElementById('next').addEventListener('click', () => {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                updateMonthInput();
                renderCalendar(currentYear, currentMonth, data);
            });

            // Add an event listener to the month input to handle manual month/year selection
            monthInput.addEventListener('input', () => {
                let [year, month] = monthInput.value.split('-').map(Number);
                currentYear = year;
                currentMonth = month - 1;
                renderCalendar(currentYear, currentMonth, data);
            });

            function updateMonthInput() {
                monthInput.value = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}`;
            }

            // Function to get commemorative days for the given year and month
            function getCommemorativeDays(year, month, events) {
                let specialDays = {};
                events.forEach(event => {
                    if (event.monthName.toLowerCase() !== new Date(year, month).toLocaleString('default', { month: 'long' }).toLowerCase()) return;
                    
                    let lastDay = new Date(year, month + 1, 0);
                    let dayOccurrences = [];
                    
                    for (let d = 1; d <= lastDay.getDate(); d++) {
                        let tempDate = new Date(year, month, d);
                        if (tempDate.toLocaleString('default', { weekday: 'long' }).toLowerCase() === event.dayName.toLowerCase()) {
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

            // Function to render the calendar for the given year and month
            function renderCalendar(year, month, events) {
                const grid = document.getElementById('grid');
                grid.innerHTML = '';
                
                // Create header elements for the days of the week
                const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                weekdays.forEach(day => {
                    const dayElement = document.createElement('div');
                    dayElement.classList.add('header');
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
                    const emptyDay = document.createElement('div');
                    emptyDay.classList.add('day', 'empty');
                    grid.appendChild(emptyDay);
                }

                const specialDaysContainer = document.getElementById('special-days');
                specialDaysContainer.innerHTML = '';

                // Loop through each day of the month and create a div for it
                for (let day = 1; day <= daysInMonth; day++) {
                    const dayElement = document.createElement('div');
                    dayElement.classList.add('day');
                    dayElement.textContent = day;
                    
                    // If the day is a commemorative day, add a special class and tooltip
                    if (commemorativeDays[day]) {
                        dayElement.classList.add('commemorative');
                        dayElement.title = commemorativeDays[day].name;
                        
                        // Add the commemorative day to the special days container
                        const specialDayElement = document.createElement('div');
                        specialDayElement.textContent = `${commemorativeDays[day].name} - ${day} ${new Date(year, month).toLocaleString('default', { month: 'long' })}`;
                        specialDaysContainer.appendChild(specialDayElement);
                        
                        // Add a click event listener to fetch and display the event description
                        dayElement.addEventListener('click', () => {
                            fetch(commemorativeDays[day].descriptionURL)
                                .then(response => response.text())
                                .then(text => {
                                    alert(text);
                                })
                                .catch(error => console.error('Error fetching description:', error));
                        });
                    }
                    grid.appendChild(dayElement);
                }
            }
            
            renderCalendar(currentYear, currentMonth, data);
        })
        .catch(error => console.error('Error loading days.json:', error));
});