function addTransactionDB(transaction){
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', './');
    // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhr.setRequestHeader('x-csrf-token', csrfToken);
    
    // xhr.onload = () => {
    //     console.log(`cancelJob: ${xhr.status} ${xhr.response}`);
    // }
    // xhr.onerror =  function(){

    // };
    // console.log(JSON.stringify(transaction));
    // xhr.send(JSON.stringify(transaction));
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