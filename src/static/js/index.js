document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    
    calendar = new FullCalendar.Calendar(calendarEl, {
        selectable: true,
        showNonCurrentDates: false,
        height: "100%",
        headerToolbar: {
            left: '',
            center: 'title',
            right: ''
        },
        dateClick: function(info) {
        },
        select: function(info) {
            alert('selected ' + info.startStr + ' to ' + info.endStr);
        }
    });
    // $(".fc-right").append('<select class="select_month form-control"><option value="">Select Month</option><option value="1">Jan</option><option value="2">Feb</option><option value="3">Mrch</option><option value="4">Aprl</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">Aug</option><option value="9">Sep</option><option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option></select>');
    // $(".fc-left").append('<select class="select_year form-control"><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option></select>');
    console.log(initTransactions)
    for(let key in initTransactions){
        let transaction = initTransactions[key];
        console.log(transaction)
        let date = new Date(transaction["date"] + 'T00:00:00');
        calendar.addEvent({
            title: transaction["title"],
            start: date,
            allDay: true
        })
        
    }
    calendar.render();
    
    document.getElementById("test").onclick = function() { console.log(calendar.getEvents()) }
    document.getElementById("add").onclick = function() { 
        var dateStr = prompt('Enter a date in YYYY-MM-DD format');
        var date = new Date(dateStr + 'T00:00:00'); // will be in local time

        if (!isNaN(date.valueOf())) { // valid?
            calendar.addEvent({
                title: 'dynamic event',
                start: date,
                allDay: true
            });
            alert('Great. Now, update your database...');
          } else {
            alert('Invalid date.');
          }
     }

    });
