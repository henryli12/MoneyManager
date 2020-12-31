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
            addMonthlyStatus(transaction['type'], transaction['amount'])
        }
        $('#add_modal').modal('hide');
        $('#add_title').val("");
        $('#add_description').val("");
        $('#add_amount').val(0.01);
        $('#add_type').val('expense');
        $('#add_date').val(formatDate(new Date(), "date"));
    })
    $('#edit_form').submit(function(e) {
        e.preventDefault();
        let id = $('#edit_id').val();
        let transaction = {
            'title': $('#edit_title').val() !== "" ? $('#edit_title').val() : "New Transaction",
            'description': $('#edit_description').val(),
            'amount': $('#edit_amount').val(),
            'type': $('#edit_type').find(":selected").text().split("")[0],
            'date': $('#edit_date').val(),
        }
        // editTransactionDB(transaction, id);
        if(transaction['date'].includes($('#month_display').val())) {
            editTransactionCard(transaction, id);
            let originalTransaction = calendar.getEventById(id)["extendedProps"];
            addMonthlyStatus(transaction['type'], transaction['amount']);
            removeMonthlyStatus(originalTransaction['type'], originalTransaction['amount']);
        }
        editCalendarEvent(transaction, id);
        $('#edit_modal').modal('hide');
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

function editTransaction(id){
    let event = calendar.getEventById(id);
    let transaction = event["extendedProps"];
    console.log(transaction);
    let type = transaction["type"] === "E" ? "expense" : "income";
    $('#edit_id').val(id);
    $('#edit_title').val(event["title"]);
    $('#edit_description').val(transaction["description"]);
    $('#edit_amount').val(transaction["amount"]);
    $('#edit_type').val(type);
    $('#edit_date').val(transaction["date"]);
    $('#edit_modal').modal('show');
}