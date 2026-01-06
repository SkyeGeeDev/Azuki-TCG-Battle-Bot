// src/store/useDeckStore.js
import { create } from 'zustand';

export const useDeckStore = create((set) => ({
  deck: [], // This array holds the cards the user picked

  // ACTION: Add a card to the deck
  addToDeck: (card) => set((state) => {
    // 1. Check if deck is full (Example: Max 50 cards)
    if (state.deck.length >= 50) return state;

    // 2. Check how many copies of this card are already in the deck
    const copies = state.deck.filter((c) => c.id === card.id).length;
    if (copies >= 4) {
      alert("You can only have 4 copies of a card!");
      return state; 
    }

    // 3. Add the card
    return { deck: [...state.deck, card] };
  }),

  // ACTION: Remove a card from the deck
  removeFromDeck: (cardId) => set((state) => {
    // Find the index of the first card with this ID and remove it
    const index = state.deck.findIndex((c) => c.id === cardId);
    if (index === -1) return state;

    const newDeck = [...state.deck];
    newDeck.splice(index, 1);
    return { deck: newDeck };
  }),
  
  // ACTION: Clear deck
  clearDeck: () => set({ deck: [] }),
}));