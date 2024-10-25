'use client';

import type { DraftPhase, TeamState } from '@/types/draft';
import type { Champion } from '@/types/champion';
import { useEffect, useState } from 'react';
import { getChampions } from '@/lib/utils/getChampions';

interface TeamSideProps {
  team: 'Blue' | 'Red';
  state: TeamState;
  currentPhase: DraftPhase | null;
  isActive: boolean;
  onAction: (champion: string) => void;
}

export default function TeamSide({
  team,
  state,
  currentPhase,
  isActive,
  onAction
}: TeamSideProps) {
  const [champions, setChampions] = useState<Record<string, Champion>>({});
  const bgColor = team === 'Blue' ? 'bg-blue-900/30' : 'bg-red-900/30';
  const borderColor = team === 'Blue' ? 'border-blue-500' : 'border-red-500';
  const gradientDirection = team === 'Blue' ? 'to-right' : 'to-left';

  useEffect(() => {
    async function loadChampions() {
      const championsArray = await getChampions();
      const championsMap = championsArray.reduce((acc, champion) => {
        acc[champion.name] = champion;
        return acc;
      }, {} as Record<string, Champion>);
      setChampions(championsMap);
    }
    loadChampions();
  }, []);

  const getSplashUrl = (championName: string) => {
    const champion = champions[championName];
    if (!champion) return '';
    // Convert champion ID to the format used in splash art URLs
    const championId = champion.id;
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`;
  };

  return (
    <div className={`w-1/4 ${bgColor} flex flex-col`}>
      <div className="p-4">
        <h2 className={`text-xl font-bold mb-4 text-center ${team === 'Blue' ? 'text-blue-400' : 'text-red-400'}`}>
          {team} Team
        </h2>

        {/* Picks */}
        <div className="space-y-4">
          {state.picks.map((pick, i) => (
            <div
              key={`${team}-pick-${i}`}
              className={`
                h-24 rounded-lg border-2 ${borderColor} p-2 relative overflow-hidden
                ${isActive && currentPhase?.team === team && currentPhase?.action === 'Pick' && currentPhase?.index === i
                  ? 'border-yellow-500 animate-pulse'
                  : ''}
              `}
            >
              {pick ? (
                <>
                  {/* Background Splash Art */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url('${getSplashUrl(pick)}')` }}
                  />
                  {/* Gradient Overlay */}
                  <div 
                    className={`absolute inset-0 bg-gradient-${gradientDirection} from-transparent via-black/50 to-black/80`}
                  />
                  {/* Champion Name and Icon */}
                  <div className="relative flex items-center h-full gap-4">
                    {champions[pick] && (
                      <img 
                        src={champions[pick].image.full}
                        alt={pick}
                        className="h-16 w-16 rounded-full border-2 border-white/50"
                      />
                    )}
                    <span className="text-lg font-semibold text-white">{pick}</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Empty
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bans */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-center">Bans</h3>
          <div className="grid grid-cols-5 gap-2">
            {state.bans.map((ban, i) => (
              <div
                key={`${team}-ban-${i}`}
                className={`
                  aspect-square rounded border ${borderColor} flex items-center justify-center
                  relative overflow-hidden
                  ${isActive && currentPhase?.team === team && currentPhase?.action === 'Ban' && currentPhase?.index === i
                    ? 'border-yellow-500 animate-pulse'
                    : ''}
                `}
              >
                {ban ? (
                  <div className="relative">
                    {champions[ban] && (
                      <>
                        <img 
                          src={champions[ban].image.full}
                          alt={ban}
                          className="w-full h-full object-cover"
                        />
                        {/* Red diagonal line */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[140%] h-0.5 bg-red-500 absolute transform rotate-45" />
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
