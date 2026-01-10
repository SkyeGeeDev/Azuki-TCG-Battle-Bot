import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDeckStore = create(
  persist(
    (set) => ({
      deck: [],
      customSkins: {}, // Stores user-added alt arts

      // ACTION: Add a card (handles Variants and Max Limits)
      addToDeck: (cardData, variantData) => set((state) => {
        // 1. Check Max Deck Size
        if (state.deck.length >= 50) return state;

        // 2. Check Max Copies (4 per card)
        // We look at 'parentId' to ensure they don't add 4 Standard + 4 Alt Arts
        const copies = state.deck.filter((c) => c.parentId === cardData.id).length;
        if (copies >= 4) {
          alert("You can only have 4 copies of a card!");
          return state;
        }

        // 3. Create the Deck Entry
        const newCardEntry = {
          uniqueId: Date.now() + Math.random(), // Unique ID for this specific card instance
          parentId: cardData.id,     // "AZK01-001"
          variantId: variantData?.id || "standard",
          name: cardData.name,
          image: variantData?.image || cardData.image, // Fallback if variant is missing
          cost: cardData.cost,
          rarity: variantData?.rarity || cardData.rarity
        };

        return { deck: [...state.deck, newCardEntry] };
      }),

      // ACTION: Remove a card (The missing function!)
      removeFromDeck: (targetParentId) => set((state) => {
        // 1. Find the index of the *first* card that matches the ID the user clicked
        const index = state.deck.findIndex((c) => c.parentId === targetParentId);
        
        // If not found, do nothing
        if (index === -1) return state;

        // 2. Create a copy of the deck and remove that one item
        const newDeck = [...state.deck];
        newDeck.splice(index, 1);

        return { deck: newDeck };
      }),

      // ACTION: Clear the whole deck
      clearDeck: () => set({ deck: [] }),

      // ACTION: Add Custom Skin (Optional feature we discussed)
      addCustomSkin: (cardId, newSkin) => set((state) => {
        const existingSkins = state.customSkins[cardId] || [];
        return {
          customSkins: {
            ...state.customSkins,
            [cardId]: [...existingSkins, newSkin]
          }
        };
      }),
    }),
    {
      name: 'azuki-deck-storage', // Saves to localStorage
    }
  )
);