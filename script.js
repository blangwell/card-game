async function getNewDeck() {
  let deckResponse = await axios.get('https://www.deckofcardsapi.com/api/deck/new/');
  return deckResponse.data;
}

async function shuffleDeck(deckID, remaining=true) {
  try {
    let shuffledDeck = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/shuffle/?remaining=${remaining}`);
    if (!shuffledDeck.data.success) {
      throw new Error('API response indicates GET request was unsuccessful')
    } 
    if (!shuffledDeck.data.shuffled) {
      throw new Error('Deck not shuffled successfully!');
    }
    return shuffledDeck.data;
  } catch (err) {
    console.error(`Error reshuffling deck - ${err}`);
  }
}

async function drawFromDeck(deckID, count=1) {
  try {
    let drawn = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=${count}`);
    if (!drawn.data.success) {
      throw new Error('Error drawing a card!');
    }
    let cards = drawn.data.cards;
    for (let card of cards) {
      console.log(card);
      let cardImage = document.createElement('img');
      cardImage.src = card.image;
      document.body.appendChild(cardImage);
    }
    return drawn.data;
  } catch (err) {
    console.error(err);
  }
}

async function playGame() { 
  let deck = await getNewDeck();
  console.log(deck);
  deck = await shuffleDeck(deck.deck_id);
  let drawnCard = await drawFromDeck(deck.deck_id, 2);
  console.log(drawnCard)
}

playGame();