'use client';

import type { DraftPhase, TeamState } from '@/types/draft';

interface TeamSideProps {
  team: 'Blue' | 'Red';
  state: TeamState;
  currentPhase: DraftPhase | null;
  isActive: boolean;
  onAction: (champion: string) => void;
}


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
    const bgColor = team === 'Blue' ? 'bg-blue-900/30' : 'bg-red-900/30';
    const borderColor = team === 'Blue' ? 'border-blue-500' : 'border-red-500';
  
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
                  h-24 rounded-lg border-2 ${borderColor} p-2
                  ${isActive && currentPhase?.team === team && currentPhase?.action === 'Pick' && currentPhase?.index === i
                    ? 'border-yellow-500 animate-pulse'
                    : ''}
                `}
              >
                {pick ? (
                  <div className="flex items-center h-full">
                    <span className="w-full text-center">{pick}</span>
                  </div>
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
                    aspect-square rounded border ${borderColor} flex items-center justify-center text-sm
                    ${isActive && currentPhase?.team === team && currentPhase?.action === 'Ban' && currentPhase?.index === i
                      ? 'border-yellow-500 animate-pulse'
                      : ''}
                  `}
                >
                  {ban || '-'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }