"use client";

import { useState } from "react";
import { allCards } from "../data/cards";
import { useDeckStore } from "../store/useDeckStore";
import CardTile from "../src/CardTile";

export default function Home() {
  const { deck, addToDeck, removeFromDeck, clearDeck } = useDeckStore();

  // Check if a Leader is already in the deck
  const hasLeader = deck.some((card) => card.category === "Leader");

  // Logic: Show ONLY Leaders if none are picked. Otherwise, show everything else.
  const displayedCards = allCards?.filter((card) => {
    if (!hasLeader) {
      return card.category === "Leader";
    }
    // Once a leader is picked, show non-leader cards (or keep leaders visible if you prefer)
    return card.category !== "Leader";
  });

  return (
    <main className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* TOP SECTION */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT COLUMN: Card Library */}
        <div className="flex-1 p-6 overflow-y-auto border-r border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              {!hasLeader ? "Choose Your Leader" : "Build Your Deck"}
            </h1>
            {hasLeader && (
               <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                 Leader Assigned
               </span>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedCards?.map((card) => (
              <CardTile 
                key={card.id} 
                card={card} 
                onAdd={(c, v) => addToDeck(c, v)} 
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Your Current Deck */}
        <div className="w-80 bg-gray-800 p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Your Deck</h2>

          <div className="flex-1 overflow-y-auto space-y-2">
            {deck.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-50">
                <p className="text-sm italic">Selection Required</p>
              </div>
            ) : (
              [...new Set(deck.map(c => c.parentId || c.id))].map(uniqueId => {
                const card = deck.find(c => (c.parentId || c.id) === uniqueId);
                const count = deck.filter(c => (c.parentId || c.id) === uniqueId).length;
                if (!card) return null;

                return (
                  <div key={uniqueId} className={`flex justify-between items-center p-3 rounded text-sm ${card.category === 'Leader' ? 'bg-yellow-900/30 border border-yellow-600' : 'bg-gray-700'}`}>
                    <div>
                      <span className={`font-bold mr-2 ${card.category === 'Leader' ? 'text-yellow-400' : 'text-blue-400'}`}>
                        {card.category === 'Leader' ? 'L' : `x${count}`}
                      </span>
                      <span className={card.category === 'Leader' ? 'font-bold' : ''}>{card.name}</span>
                    </div>
                    <button onClick={() => removeFromDeck(uniqueId)} className="text-red-400 hover:text-red-200">
                      Remove
                    </button>
                  </div>
                )
              })
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-600">
            <div className="flex justify-between text-xs mb-2 text-gray-400">
                <span>Total Cards</span>
                <span>{deck.length} / 50</span>
            </div>
            <button onClick={clearDeck} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm transition-all active:scale-95">
              Reset Deck
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Dialogue Box */}
      <div className="h-64 bg-black border-t-4 border-yellow-600 p-8 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-2xl">
          <h3 className="text-yellow-500 font-bold uppercase tracking-widest text-xs mb-3 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse" />
            Recruiter
          </h3>
          <p className="text-2xl leading-relaxed font-medium transition-all duration-500">
            {!hasLeader 
              ? `"Before we begin, you need someone to lead the charge. Who is the face of your squad?"`
              : `"Excellent choice. Now, fill the ranks. A leader is only as strong as the deck behind them."`
            }
          </p>
        </div>

        <div className="h-full items-end">
           <img 
             src="..\nft.png" 
             alt="Character" 
             className={`h-[120%] w-auto object-contain transform transition-transform duration-700 ${!hasLeader ? 'scale-100' : 'scale-110 -translate-y-4'}`}
           />
        </div>
      </div>

    </main>
  );
}