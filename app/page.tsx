// src/app/page.js
"use client"; // This tells Next.js this is an interactive page

import { allCards } from "../data/cards";
import { useDeckStore } from "../store/useDeckStore";

export default function Home() {
  // Grab the data and functions from our store
  const { deck, addToDeck, removeFromDeck, clearDeck } = useDeckStore();

  return (
    <main className="flex min-h-screen flex-row bg-gray-900 text-white">
      
      {/* LEFT COLUMN: Card Library */}
      <div className="w-2/3 p-6 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold mb-6">Azuki Deck Builder</h1>
        
        {/* The Grid of Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allCards.map((card) => (
            <div 
              key={card.id} 
              onClick={() => addToDeck(card)}
              className="cursor-pointer hover:scale-105 transition-transform border border-gray-700 rounded-lg overflow-hidden"
            >
              <img src={card.image} alt={card.name} className="w-full h-auto" />
              <div className="p-2 bg-gray-800">
                <p className="font-bold text-sm">{card.name}</p>
                <p className="text-xs text-gray-400">Cost: {card.cost} | {card.element}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Your Current Deck */}
      <div className="w-1/3 bg-gray-800 p-6 border-l border-gray-700 h-screen flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Deck</h2>
          <span className="text-sm bg-blue-600 px-2 py-1 rounded">
            {deck.length} / 50
          </span>
        </div>

        {/* Deck List - Scrollable Area */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {deck.length === 0 ? (
            <p className="text-gray-500 italic">Click cards on the left to add them.</p>
          ) : (
            // We map through unique cards to show counts (advanced but cleaner)
            [...new Set(deck.map(c => c.id))].map(uniqueId => {
               const card = deck.find(c => c.id === uniqueId);
               const count = deck.filter(c => c.id === uniqueId).length;
               
               return (
                 <div key={uniqueId} className="flex justify-between items-center bg-gray-700 p-3 rounded group">
                   <div>
                     <span className="font-bold text-yellow-400 mr-2">x{count}</span>
                     <span>{card.name}</span>
                   </div>
                   <button 
                     onClick={() => removeFromDeck(uniqueId)}
                     className="text-red-400 hover:text-red-200 text-sm"
                   >
                     Remove
                   </button>
                 </div>
               )
            })
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-4 border-t border-gray-600">
          <button 
            onClick={clearDeck}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded mb-2"
          >
            Clear Deck
          </button>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
            Save Deck (Coming Soon)
          </button>
        </div>
      </div>

    </main>
  );
}