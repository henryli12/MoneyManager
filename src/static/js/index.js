$( document ).ready(function() {
    addCalendarEvents(initTransactions);
    addTransactionCard(initTransactions);
    calendar.render();

    $('#add_date').attr("value", formatDate(new Date(), "date"));
    $('#month_display').attr("value", formatDate(new Date(), "month"));
    $('#month_display').change(function() {
        console.log(this.value);
        if(this.value){
            calendar.gotoDate(this.value);
        }
    });
    $('#add').click(function() {
        $('#add_modal').modal();
   });
   $('#prev_month').click(function() {
        let date = new Date($('#month_display').val() + "-01")
        date.setMonth(date.getMonth());
        console.log(date)
        $('#month_display').attr("value", formatDate(date, "month"));
        calendar.gotoDate(date);
        this.blur();
    });
    $('#next_month').click(function() {
        let date = new Date($('#month_display').val() + "-01")
        date.setMonth(date.getMonth() + 2);
        console.log(date)
        $('#month_display').attr("value", formatDate(date, "month"));
        calendar.gotoDate(date);
        this.blur();
    });

    $('#modal_add').click(function() {
        let transaction = {
            'title': $('#add_title').val(),
            'description': $('#add_description').val(),
            'amount': $('#add_amount').val(),
            'type': $('#add_type').find(":selected").text().split("")[0],
            'date': $('#add_date').val(),

        }
        console.log(transaction);
        $('#add_modal').modal('hide');
        addCalendarEvents({1:transaction});
        addTransactionCard({1:transaction});
    })

});

function formatDate(d, type) {
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2){
        month = '0' + month;
    }
    if (type === "month"){
        return [year, month].join('-');
    }
    if (day.length < 2){
        day = '0' + day;
    }

    return [year, month, day].join('-');
}