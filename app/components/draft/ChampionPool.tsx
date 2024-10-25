'use client';

import { useState, useEffect } from 'react';
import type { Champion } from '@/types/champion';
import type { DraftPhase } from '@/types/draft';
import { getChampions } from '@/lib/utils/getChampions';

interface ChampionPoolProps {
  isActive: boolean;
  currentPhase: DraftPhase | null;
  onSelect: (champion: string) => void;
  bluePicks: string[];
  redPicks: string[];
  blueBans: string[];
  redBans: string[];
}

interface ChampionPoolProps {
    isActive: boolean;
    currentPhase: DraftPhase | null;
    onSelect: (champion: string) => void;
    bluePicks: string[];
    redPicks: string[];
    blueBans: string[];
    redBans: string[];
  }
  
  export default function ChampionPool({
    isActive,
    currentPhase,
    onSelect,
    bluePicks,
    redPicks,
    blueBans,
    redBans
  }: ChampionPoolProps) {
    const [champions, setChampions] = useState<Champion[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function loadChampions() {
        const data = await getChampions();
        setChampions(data);
        setLoading(false);
      }
  
      loadChampions();
    }, []);
  
    const usedChampions = [...bluePicks, ...redPicks, ...blueBans, ...redBans];
    
    const filteredChampions = champions.filter(champion =>
      champion.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !usedChampions.includes(champion.name)
    );
  
    return (
      <div className="flex-1 bg-gray-800 p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search champions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
  
        {loading ? (
          <div className="text-center py-4">Loading champions...</div>
        ) : (
          <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 overflow-y-auto max-h-[calc(100vh-240px)]">
            {filteredChampions.map((champion) => (
              <button
                key={champion.id}
                onClick={() => isActive && currentPhase && onSelect(champion.name)}
                disabled={!isActive || !currentPhase}
                className={`
                  flex flex-col items-center p-2 rounded transition-colors
                  ${isActive && currentPhase ? 'hover:bg-gray-700 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                `}
              >
                <img 
                  src={champion.image.full}
                  alt={champion.name}
                  className="w-12 h-12 rounded-full"
                />
                <span className="text-xs mt-1 text-center">{champion.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }