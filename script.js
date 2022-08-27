async function getShuffledDeck(deckCount=1) {
  try {
    let shuffledDeckResponse = await axios.get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`);
    if (!shuffledDeckResponse.data.success) {
      throw new Error('API response indicates GET request was unsuccessful.')
    }
    let deckId = shuffledDeckResponse.data.deck_id;
    return deckId;
  } catch(err) {
    console.error(`Error making GET request - ${err}`);
    return -1;
  }
}

getShuffledDeck(1);