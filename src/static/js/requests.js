function addTransactionDB(transaction){
    $.ajax(
        {
            headers: { "X-CSRFToken": csrfToken },
            type: 'POST',
            url: './add_transaction/',
            data: JSON.stringify(transaction),
            dataType: 'json',
            success: function(){
                console.log('success');
            }
        }
    );
}
function getTransactionsDB(date){
    $.ajax(
        {
            headers: { "X-CSRFToken": csrfToken },
            type: 'GET',
            url: `./get/${date}`,
            success: function(response){
                console.log('success');
                console.log(response)
                let transactions = JSON.parse(response);
                addTransactionCard(transactions)
            }
        }
    );
}