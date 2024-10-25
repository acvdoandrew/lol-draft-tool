'use client';

import { useState } from 'react';
import { draftPhases } from '@/lib/constants/draftPhases';
import TeamSide from './TeamSide';
import ChampionPool from './ChampionPool';
import type { TeamState } from '@/types/draft';
// import type { Champion } from '@/types/champion';

export default function DraftTool() {
  const [phase, setPhase] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [blueTeam, setBlueTeam] = useState<TeamState>({
    picks: Array(5).fill(''),
    bans: Array(5).fill('')
  });
  const [redTeam, setRedTeam] = useState<TeamState>({
    picks: Array(5).fill(''),
    bans: Array(5).fill('')
  });

  const handleAction = (champion: string) => {
    if (!isActive || phase >= draftPhases.length) return;

    const currentPhase = draftPhases[phase];
    const team = currentPhase.team === 'Blue' ? blueTeam : redTeam;
    const setTeam = currentPhase.team === 'Blue' ? setBlueTeam : setRedTeam;

    const newTeam = {
      ...team,
      [currentPhase.action.toLowerCase() + 's']: team[currentPhase.action.toLowerCase() + 's' as keyof TeamState].map(
        (value, i) => (i === currentPhase.index ? champion : value)
      )
    };

    setTeam(newTeam);
    setPhase(phase + 1);
  };

  const resetDraft = () => {
    setPhase(0);
    setIsActive(false);
    setBlueTeam({ picks: Array(5).fill(''), bans: Array(5).fill('') });
    setRedTeam({ picks: Array(5).fill(''), bans: Array(5).fill('') });
  };

  const currentPhase = phase < draftPhases.length ? draftPhases[phase] : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Timer and Phase Indicator */}
      <div className="text-center py-4 bg-gray-800">
        <h1 className="text-2xl font-bold text-yellow-500 mb-2">Champion Select</h1>
        {!isActive ? (
          <button
            onClick={() => setIsActive(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-semibold"
          >
            Start Draft
          </button>
        ) : (
          <div className="text-lg">
            {phase < draftPhases.length ? (
              <span className="text-yellow-500">
                {draftPhases[phase].team} Team {draftPhases[phase].action}
              </span>
            ) : (
              <span className="text-green-500">Draft Complete</span>
            )}
          </div>
        )}
      </div>

      {/* Main Draft Area */}
      <div className="flex min-h-[calc(100vh-116px)]">
        {/* Blue Side */}
        <TeamSide
          team="Blue"
          state={blueTeam}
          currentPhase={currentPhase}
          isActive={isActive}
          onAction={handleAction}
        />

        {/* Champion Pool */}
        <ChampionPool
          isActive={isActive}
          currentPhase={currentPhase}
          onSelect={handleAction}
          bluePicks={blueTeam.picks}
          redPicks={redTeam.picks}
          blueBans={blueTeam.bans}
          redBans={redTeam.bans}
        />

        {/* Red Side */}
        <TeamSide
          team="Red"
          state={redTeam}
          currentPhase={currentPhase}
          isActive={isActive}
          onAction={handleAction}
        />
      </div>

      {/* Reset Button */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={resetDraft}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold"
        >
          Reset Draft
        </button>
      </div>
    </div>
  );
}