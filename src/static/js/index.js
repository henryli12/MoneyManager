$( document ).ready(function() {
    addCalendarEvents(initTransactions);
    calendar.render();

    $('#add_date').val(formatDate(new Date(), "date"));
    $('#month_display').val(formatDate(new Date(), "month"));
    $('#month_display').change(function() {
        console.log(this.value);
        if(this.value){
            calendar.gotoDate(this.value);
        }
    });
    $('#add').click(function() {
        $('#add_modal').modal();
   });
   $('#get').click(function() {
        getTransactionsDB($('#month_display').val());
    });
   $('#prev_month').click(function() {
        let date = new Date($('#month_display').val() + "-01");
        date.setMonth(date.getMonth(), 1);
        changeMonth(date);
        this.blur();
    });
    $('#next_month').click(function() {
        let date = new Date($('#month_display').val() + "-01");
        date.setMonth(date.getMonth() + 2, 1);
        changeMonth(date);
        this.blur();
    });
    $('#add_modal').on('shown.bs.modal', function (e) {
        console.log('modal shown');
        $('#add_title').focus();
    })
    $('#add_form').submit(function(e) {
        e.preventDefault();
        let tempID = Date.now();
        let transaction = {
            'title': $('#add_title').val() !== "" ? $('#add_title').val() : "New Transaction",
            'description': $('#add_description').val(),
            'amount': $('#add_amount').val(),
            'type': $('#add_type').find(":selected").text().split("")[0],
            'date': $('#add_date').val(),

        }
        transaction["id"] = tempID;
        addCalendarEvents({1:transaction});
        addTransactionDB(transaction);
        if(transaction['date'].includes($('#month_display').val())) {
            addTransactionCard({1:transaction});
            updateMonthlyStatus(transaction['type'], transaction['amount'])
        }
        $('#add_modal').modal('hide');
        $('#add_title').val("");
        $('#add_description').val("");
        $('#add_amount').val(0.01);
        $('#add_type').val('expense');
        $('#add_date').val(formatDate(new Date(), "date"));
    })
    
    // Get transactions for current month to display 
    getTransactionsDB($('#month_display').val());
});

function changeMonth(date){
    console.log(date);
    let current = new Date()
    if (date.getMonth() === current.getMonth()){
        date = current
    }
    $('#month_display').val(formatDate(date, "month"));
    $('#add_date').val(formatDate(date, "date"));
    calendar.gotoDate(date);
    $("#transactions_container").empty()
    getTransactionsDB($('#month_display').val());
}

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