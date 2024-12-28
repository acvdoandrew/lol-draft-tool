"use client";

import { useEffect, useState } from "react";
import type { DraftPhase, TeamState } from "@/types/draft";
import type { Champion } from "@/types/champion";
import { getChampions } from "@/lib/utils/getChampions";
import styles from "./TeamSide.module.css";

interface TeamSideProps {
  team: "Blue" | "Red";
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
  onAction,
}: TeamSideProps) {
  const [champions, setChampions] = useState<Record<string, Champion>>({});
  const isBlue = team === "Blue";

  useEffect(() => {
    async function loadChampions() {
      const championsArray = await getChampions();
      const championsMap = championsArray.reduce(
        (acc, champion) => {
          acc[champion.name] = champion;
          return acc;
        },
        {} as Record<string, Champion>,
      );
      setChampions(championsMap);
    }
    loadChampions();
  }, []);

  const getSplashUrl = (championName: string) => {
    const champion = champions[championName];
    if (!champion) return "";
    const championId = champion.id;
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`;
  };

  return (
    <div
      className={`${styles.container} ${isBlue ? styles.blueTeam : styles.redTeam}`}
    >
      <div className={styles.header}>
        <h2 className={isBlue ? styles.teamTitleBlue : styles.teamTitleRed}>
          {team} Team
        </h2>
      </div>

      <div className={styles.picksSection}>
        {state.picks.map((pick, i) => (
          <div
            key={`${team}-pick-${i}`}
            className={`
              ${styles.pickSlot}
              ${pick ? styles.pickSlotFilled : styles.pickSlotEmpty}
              ${isBlue ? styles.pickSlotBlue : styles.pickSlotRed}
              ${
                isActive &&
                currentPhase?.team === team &&
                currentPhase?.action === "Pick" &&
                currentPhase?.index === i
                  ? styles.pickSlotActive
                  : ""
              }
            `}
          >
            {pick ? (
              <>
                <div
                  className={styles.pickContent}
                  style={{
                    backgroundImage: `url('${getSplashUrl(pick)}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.3,
                  }}
                />
                <div className={styles.pickContent}>
                  {champions[pick] && (
                    <img
                      src={champions[pick].image.full}
                      alt={pick}
                      className={styles.championIcon}
                    />
                  )}
                  <span className={styles.championName}>{pick}</span>
                </div>
              </>
            ) : (
              <div className={styles.emptySlotText}>
                {isActive &&
                currentPhase?.team === team &&
                currentPhase?.action === "Pick" &&
                currentPhase?.index === i
                  ? "Select Champion"
                  : "Empty"}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.bansSection}>
        <h3 className={styles.bansTitle}>Bans</h3>
        <div className={styles.bansGrid}>
          {state.bans.map((ban, i) => (
            <div
              key={`${team}-ban-${i}`}
              className={`
                ${styles.banSlot}
                ${isBlue ? styles.pickSlotBlue : styles.pickSlotRed}
                ${
                  isActive &&
                  currentPhase?.team === team &&
                  currentPhase?.action === "Ban" &&
                  currentPhase?.index === i
                    ? styles.pickSlotActive
                    : ""
                }
              `}
            >
              {ban ? (
                <div className="relative">
                  {champions[ban] && (
                    <>
                      <img
                        src={champions[ban].image.full}
                        alt={ban}
                        className={styles.championIcon}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[140%] h-0.5 bg-red-500 absolute transform rotate-45" />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <span>-</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
