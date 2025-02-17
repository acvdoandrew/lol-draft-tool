"use client";

import { useState, useEffect } from "react";
import type { Champion } from "@/types/champion";
import type { DraftPhase } from "@/types/draft";
import { getChampions } from "@/lib/utils/getChampions";
import styles from "./ChampionPool.module.css";

interface ChampionPoolProps {
  isActive: boolean;
  currentPhase: DraftPhase | null;
  onSelect: (champion: string) => void;
  bluePicks: string[];
  redPicks: string[];
  blueBans: string[];
  redBans: string[];
}
console.log("Hi testing SSH and LazyGit");
export default function ChampionPool({
  isActive,
  currentPhase,
  onSelect,
  bluePicks,
  redPicks,
  blueBans,
  redBans,
}: ChampionPoolProps) {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredChampions = champions.filter(
    (champion) =>
      champion.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !usedChampions.includes(champion.name),
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search champions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-[#C8AA6E]">
          Loading champions...
        </div>
      ) : (
        <div className={styles.championGrid}>
          {filteredChampions.map((champion) => (
            <button
              key={champion.id}
              onClick={() =>
                isActive && currentPhase && onSelect(champion.name)
              }
              disabled={!isActive || !currentPhase}
              className={styles.championButton}
            >
              <img
                src={champion.image.full}
                alt={champion.name}
                className={styles.championImage}
              />
              <span className={styles.championName}>{champion.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
