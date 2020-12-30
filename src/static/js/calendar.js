var calendarEl = document.getElementById('calendar');
calendar = new FullCalendar.Calendar(calendarEl, {
    showNonCurrentDates: false,
    fixedWeekCount: false,
    dayMaxEvents: 3,
    height: "100%",
    expandRows: true,
    headerToolbar: {
        left: '',
        center: 'title',
        right: ''
    },
    dateClick: function(info) {
    },
    select: function(info) {
    },
    eventClick: function(info) {
        // alert('Event: ' + info.event.id);
        editTransaction(info.event.id);
        // change the border color just for fun
        // info.el.style.borderColor = 'red';
      }
});

function addCalendarEvents(transactions){
    for(let key in transactions){
        let transaction = transactions[key];
        let date = new Date(transaction["date"] + 'T00:00:00');
        calendar.addEvent({
            title: transaction["title"],
            start: date,
            allDay: true,
            id: transaction["id"],
            extendedProps: {
                description: transaction["description"],
                amount: transaction["amount"],
                type: transaction["type"],
                date: transaction["date"]
            }
        })
    }
}
