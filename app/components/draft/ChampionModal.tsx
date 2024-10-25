'use client';

import { useState, useEffect } from 'react';
import type { Champion } from '@/types/champion';
import { getChampions } from '@/lib/utils/getChampions';

interface ChampionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (champion: Champion) => void;
}

export default function ChampionModal({ isOpen, onClose, onSelect }: ChampionModalProps) {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChampions() {
      const data = await getChampions();
      setChampions(data);
      setLoading(false);
    }

    if (isOpen) {
      loadChampions();
    }
  }, [isOpen]);

  const filteredChampions = champions.filter(champion =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white font-bold">Select Champion</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Search champions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
        />

        {loading ? (
          <div className="text-center text-white py-4">Loading champions...</div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 overflow-y-auto">
            {filteredChampions.map((champion) => (
              <button
                key={champion.id}
                onClick={() => onSelect(champion)}
                className="flex flex-col items-center p-2 rounded hover:bg-gray-700 transition-colors"
              >
                <img 
                  src={champion.image.full} 
                  alt={champion.name}
                  className="w-12 h-12 rounded-full"
                />
                <span className="text-white text-xs mt-1 text-center">
                  {champion.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}