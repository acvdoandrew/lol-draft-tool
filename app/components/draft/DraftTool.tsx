"use client";

import { useState } from "react";
import { draftPhases } from "@/lib/constants/draftPhases";
import TeamSide from "./TeamSide";
import ChampionPool from "./ChampionPool";
import type { TeamState } from "@/types/draft";
import styles from "./DraftTool.module.css";

export default function DraftTool() {
  const [phase, setPhase] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [blueTeam, setBlueTeam] = useState<TeamState>({
    picks: Array(5).fill(""),
    bans: Array(5).fill(""),
  });
  const [redTeam, setRedTeam] = useState<TeamState>({
    picks: Array(5).fill(""),
    bans: Array(5).fill(""),
  });

  const handleAction = (champion: string) => {
    if (!isActive || phase >= draftPhases.length) return;

    const currentPhase = draftPhases[phase];
    const team = currentPhase.team === "Blue" ? blueTeam : redTeam;
    const setTeam = currentPhase.team === "Blue" ? setBlueTeam : setRedTeam;

    const newTeam = {
      ...team,
      [currentPhase.action.toLowerCase() + "s"]: team[
        (currentPhase.action.toLowerCase() + "s") as keyof TeamState
      ].map((value, i) => (i === currentPhase.index ? champion : value)),
    };

    setTeam(newTeam);
    setPhase(phase + 1);
  };

  const resetDraft = () => {
    setPhase(0);
    setIsActive(false);
    setBlueTeam({ picks: Array(5).fill(""), bans: Array(5).fill("") });
    setRedTeam({ picks: Array(5).fill(""), bans: Array(5).fill("") });
  };

  const currentPhase = phase < draftPhases.length ? draftPhases[phase] : null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {currentPhase?.action === "Ban"
            ? "BAN A CHAMPION!"
            : "CHOOSE YOUR CHAMPION"}
        </h1>
        {!isActive ? (
          <div className="text-center">
            <button
              onClick={() => setIsActive(true)}
              className={styles.startButton}
            >
              Start Draft
            </button>
          </div>
        ) : (
          <div className={styles.phaseIndicator}>
            {phase < draftPhases.length ? (
              <span>
                {currentPhase?.team} Team {currentPhase?.action}
              </span>
            ) : (
              <span>Draft Complete</span>
            )}
          </div>
        )}
      </div>

      <div className={styles.mainArea}>
        <TeamSide
          team="Blue"
          state={blueTeam}
          currentPhase={currentPhase}
          isActive={isActive}
          onAction={handleAction}
        />

        <ChampionPool
          isActive={isActive}
          currentPhase={currentPhase}
          onSelect={handleAction}
          bluePicks={blueTeam.picks}
          redPicks={redTeam.picks}
          blueBans={blueTeam.bans}
          redBans={redTeam.bans}
        />

        <TeamSide
          team="Red"
          state={redTeam}
          currentPhase={currentPhase}
          isActive={isActive}
          onAction={handleAction}
        />
      </div>

      <button onClick={resetDraft} className={styles.resetButton}>
        Reset Draft
      </button>
    </div>
  );
}

