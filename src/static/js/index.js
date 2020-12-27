document.addEventListener('DOMContentLoaded', function() {
    addCalendarEvents(initTransactions);
    addTransactionCard(initTransactions);
    calendar.render();

    $('#pickyDate').datepicker({
        format: "yyyy-mm-dd",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true,
        container: '#add_modal modal-body',
    });
    $('#pickyDate').datepicker('update', new Date());
    $('#pickyDate').attr("value", formatDate(new Date()));
    document.getElementById("add").onclick = function() { 
        // var dateStr = prompt('Enter a date in YYYY-MM-DD format');
        // var date = new Date(dateStr + 'T00:00:00'); // will be in local time

        // if (!isNaN(date.valueOf())) { // valid?
        //     calendar.addEvent({
        //         title: 'dynamic event',
        //         start: date,
        //         allDay: true
        //     });
        //     alert('Great. Now, update your database...');
        // } else {
        //     alert('Invalid date.');
        // }
        $('#add_modal').modal();
   }

  });

  function formatDate(d) {
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}