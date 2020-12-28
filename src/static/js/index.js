$( document ).ready(function() {
    addCalendarEvents(initTransactions);
    addTransactionCard(initTransactions);
    calendar.render();

    $('#add_date').attr("value", formatDate(new Date()));
    document.getElementById("add").onclick = function() { 
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