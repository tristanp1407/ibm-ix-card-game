//declare suits and values with order stated in brief
const suits = [
    {suit: "C", suitorder: 1}, 
    {suit: "S", suitorder: 2}, 
    {suit: "H", suitorder: 3}, 
    {suit: "D", suitorder: 4}
    ];
const values = [
    {value: '2', valueorder:1},
    {value: '3', valueorder:2},
    {value: '4', valueorder:3},
    {value: '5', valueorder:4},
    {value: '6', valueorder:5},
    {value: '7', valueorder:6},
    {value: '8', valueorder:7},
    {value: '9', valueorder:8},
    {value: '10', valueorder:9},
    {value: 'J', valueorder:10},
    {value: 'Q', valueorder:11},
    {value: 'K', valueorder:12},
    {value: 'A', valueorder:13}
];

let deck = [];
let drawnCards = [];


//create ordered deck 
const getDeck = () => {
	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
            let crd = {
                Value: values[x].value, 
                ValueOrder: values[x].valueorder, 
                Suit: suits[i].suit, 
                SuitOrder: suits[i].suitorder 
            };
            deck.push(crd);
		}
    }
    drawnCards = [];
    console.log("Deck created...")
    return deck;
 }
getDeck();



//shuffle deck - Fisher-Yates algorythm
const shuffleDeck = () => {
    for(let i = deck.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
      }
    console.log('Cards shuffled...')
}


//Draw cards
const drawCards = () => {
    let cardsToDraw = document.getElementById("input").value;
    if (deck.length === 0) {alert('No more cards to draw... Reset cards to go again!')}
    else if (cardsToDraw > deck.length) {alert(`Please draw ${deck.length} cards or fewer.`)}
    else {
        let drawing = [];
        drawing = deck.splice(0, cardsToDraw);
        console.log(`${cardsToDraw} cards drawn`);
        drawnCards.push(...drawing);
        displayCards();
        return drawnCards, deck;
    }
}


//sort drawn cards
const sortCards = () => {
    const sortCardsbySuit = () => {
        drawnCards.sort(function(a ,b) {
            if (a.SuitOrder < b.SuitOrder) return -1;
            if (a.SuitOrder > b.SuitOrder) return 1;
            return 0;
        });
        return drawnCards    
    }
    
    const sortCardsbyValue = () => {
        drawnCards.sort(function(c ,d) {
            if (c.ValueOrder < d.ValueOrder) return -1;
            if (c.ValueOrder > d.ValueOrder) return 1;
            return 0;
        });
        return drawnCards
    }
    sortCardsbyValue();
    sortCardsbySuit();    
    console.log('Cards sorted...');
    displayCards();
}


//display cards
const displayCards = () => {
    let cards = document.querySelector("#cards");
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
    drawnCards.forEach((i)=>{
        let card = document.createElement('div');
        // card.innerHTML = i.Value + ' of ' + i.Suit;
        card.style.backgroundImage = `url(./assets/cards/${i.Value}${i.Suit}.jpg)`
        cards.appendChild(card);
    });
    console.log('Cards displayed...')
}


//reset game
const resetCards = () => {
    getDeck()
    displayCards()
};
