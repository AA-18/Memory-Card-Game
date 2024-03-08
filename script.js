let errors = 0;
let cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]

let cardSet;
let board = [];
let rows = 4;
let cols = 5;

let card1,card2;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList);

    for(let i=0;i<cardSet.length;i++)
    {
        let j = Math.floor(Math.random()*cardSet.length);

        let tmp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = tmp;
    }
    // console.log(cardSet);
}

function startGame() {
    for(let r=0;r<rows;r++)
    {
        let row = [];
        for(let c=0;c<cols;c++)
        {
            let cardImg = cardSet.pop();
            row.push(cardImg);
            let card = document.createElement("img");
            card.src = "./images/" + cardImg + ".jpg";
            card.id = r.toString()+'-'+c.toString();
            card.addEventListener("click",selectCard);
            card.classList.add("card");
            document.getElementById("board").appendChild(card);
        }
        board.push(row);
    }
    setTimeout(hideCards,1000);
} 

function hideCards() {
    for(let r=0;r<rows;r++)
    {
        for(let c=0;c<cols;c++)
        {
            let card = document.getElementById(r.toString()+'-'+c.toString());
            card.src = "./images/back.jpg";
        }
    }
}

function selectCard() {
    if(this.src.includes("back")) {
        if(!card1) {
            card1 = this;
            let coords = card1.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card1.src = "./images/" + board[r][c] + ".jpg";
        } else if(!card2 && this!=card1) {
            card2 = this;
            let coords = card2.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card2.src = "./images/" + board[r][c] + ".jpg";
            setTimeout(update,1000);
        }
    }
}

function update() {
    
    if(card1.src!=card2.src)
    {
        errors++;
        card1.src = "./images/back.jpg";
        card2.src = "./images/back.jpg";
        document.getElementById("errors").innerText = errors;
    }
    card1 = null;
    card2 = null;
}

