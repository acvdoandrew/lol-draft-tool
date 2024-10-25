import ChampionSlot from './ChampionSlot';
import type { DraftPhase, TeamState } from '@/types/draft';

type TeamSectionProps = {
  team: 'Blue' | 'Red';
  state: TeamState;
  currentPhase: DraftPhase;
  isActive: boolean;
  onAction: (champion: string) => void;
};

export default function TeamSection({
  team,
  state,
  currentPhase,
  isActive,
  onAction
}: TeamSectionProps) {
  const bgColor = team === 'Blue' ? 'bg-blue-900/30' : 'bg-red-900/30';
  const textColor = team === 'Blue' ? 'text-blue-400' : 'text-red-400';

  return (
    <div className={`${bgColor} p-4 rounded`}>
      <h2 className={`text-xl font-bold mb-4 ${textColor}`}>{team} Team</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Bans</h3>
        <div className="grid grid-cols-5 gap-2">
          {state.bans.map((ban, i) => (
            <ChampionSlot
              key={`${team}-ban-${i}`}
              value={ban}
              isActive={isActive && currentPhase?.team === team && currentPhase?.action === 'Ban' && currentPhase?.index === i}
              onSelect={onAction}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Picks</h3>
        <div className="grid grid-cols-5 gap-2">
          {state.picks.map((pick, i) => (
            <ChampionSlot
              key={`${team}-pick-${i}`}
              value={pick}
              isActive={isActive && currentPhase?.team === team && currentPhase?.action === 'Pick' && currentPhase?.index === i}
              onSelect={onAction}
            />
          ))}
        </div>
      </div>
    </div>
  );
}