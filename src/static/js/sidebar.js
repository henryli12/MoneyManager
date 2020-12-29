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