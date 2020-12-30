function addTransactionCard(transactions){
    let cardContainer = document.getElementById("transactions_container");
    for(let key in transactions){
        let transaction = transactions[key];
        let sign = (transaction["type"] === "I") ? "+" : "-";
        let card = document.createElement("div");
        card.id = key;
        card.classList.add("row", "card", "bg-light");
        
        let cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        let headerText = document.createElement("p");
        headerText.innerText = transaction["date"];
        cardHeader.appendChild(headerText);
        
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        let titleText = document.createElement("span");
        titleText.innerText = `${transaction["title"]}`;
        titleText.classList.add("card_title");
        let amountText = document.createElement("span");
        amountText.innerText = `${sign} \$${transaction["amount"]}`
        amountText.classList.add("card_amount");
        
        cardBody.appendChild(titleText);
        cardBody.appendChild(amountText);
        
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        

        let x = `<div class="row card bg-light mb-3" style="margin: 10px;">
                        <div class="card-header">
                            <h5>${transaction["title"]}</h5>
                        </div>
                        <div class="card-body">
                            <p>${transaction['date']}</p>
                        </div>
                    </div>`;
        cardContainer.appendChild(card);
    }
}

function setMonthlyStatus(expense, income){
    $('#expense').text(parseFloat(expense).toFixed(2));
    $('#income').text(parseFloat(income).toFixed(2));
    $('#net').text(parseFloat(income-expense).toFixed(2));
}

function updateMonthlyStatus(type, amount){
    amount =  parseFloat(amount);
    if (type === "I"){
        let originalIncome = parseFloat($('#income').text());
        let originalNet = parseFloat($('#net').text());
        $('#income').text(parseFloat(originalIncome + amount).toFixed(2));
        $('#net').text(parseFloat(originalNet + amount).toFixed(2));
    } else if (type === "E"){
        let originalExpense = parseFloat($('#expense').text());
        let originalNet = parseFloat($('#net').text());
        $('#expense').text(parseFloat(originalExpense + amount).toFixed(2));
        $('#net').text(parseFloat(originalNet - amount).toFixed(2));
    }
}