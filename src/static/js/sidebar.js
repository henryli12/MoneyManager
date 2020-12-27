function addTransactionCard(transactions){
    let cardContainer = document.getElementById("transactions_container");
    for(let key in transactions){
        let transaction = transactions[key]
        let card = document.createElement("div");
        card.classList.add("row", "card", "bg-light", "mb-3");
        card.style.margin = "10px";
        
        let cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        let headerText = document.createElement("h5");
        headerText.innerText = transaction["title"];
        cardHeader.appendChild(headerText);
        
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        let bodyText = document.createElement("p");
        bodyText.style.marginBottom = "0px";
        bodyText.innerText = `\$${transaction["amount"]} ${transaction["date"]}`;
        cardBody.appendChild(bodyText);
        
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