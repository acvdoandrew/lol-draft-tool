'use client';

import { useState } from 'react';
import type { Champion } from '@/types/champion';
import ChampionModal from './ChampionModal';

interface ChampionSlotProps {
  value: string;
  isActive: boolean;
  onSelect: (championName: string) => void;
}

export default function ChampionSlot({
  value,
  isActive,
  onSelect
}: ChampionSlotProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (!value && isActive) {
      setIsModalOpen(true);
    }
  };

  const handleChampionSelect = (champion: Champion) => {
    onSelect(champion.name);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`
          bg-gray-800 p-2 rounded text-center cursor-pointer min-h-[40px]
          ${!value && isActive && 'hover:bg-gray-700'}
        `}
      >
        {value || '-'}
      </div>

      <ChampionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleChampionSelect}
      />
    </>
  );
}