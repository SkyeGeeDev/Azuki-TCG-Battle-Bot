// src/components/CardTile.js
"use client";
import { useState } from 'react';

export default function CardTile({ card, onAdd }) {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);

  // Safety check to prevent crashes if data is missing
  if (!card.variants || card.variants.length === 0) {
    return null;
  }

  const currentVariant = card.variants[currentVariantIndex];

  const nextVariant = (e) => {
    e.stopPropagation();
    const nextIndex = (currentVariantIndex + 1) % card.variants.length;
    setCurrentVariantIndex(nextIndex);
  };

  return (
    <div className="relative group border border-gray-700 rounded-lg overflow-hidden bg-gray-800 
                    hover:scale-105 hover:z-10 transition-transform duration-200 ease-out shadow-lg">
      
      {/* IMAGE CONTAINER */}
      <div 
        onClick={() => onAdd(card, currentVariant)} 
        className="cursor-pointer hover:brightness-110 transition-all"
      >
        <img 
          src={currentVariant.image} 
          alt={card.name} 
          className="w-full h-auto object-contain" 
        />
      </div>

      {/* SWAP BUTTON (Only if multiple arts exist) */}
      {card.variants.length > 1 && (
        <button
          onClick={nextVariant}
          className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white text-xs px-2 py-1 rounded-full border border-gray-500 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ↻ {currentVariant.label}
        </button>
      )}

    </div>
  );
}