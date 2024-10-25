import React, { createContext, useState, ReactNode } from 'react';
import { ChampionData } from '@/utils/types';

interface DraftState {
    blueBans: ChampionData[];
    redBans: ChampionData[];
    bluePicks: ChampionData[];
    redPicks: ChampionData[];
    currentPhase: 'ban' | 'pick';
    currentTurn: 'blue' | 'red';
}

interface DraftContextProps {
    draftState: DraftState;
    setDraftState: React.Dispatch<React.SetStateAction<DraftState>>;
}

export const DraftContext = createContext<DraftContextProps | undefined>(undefined);

export const DraftProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [draftState, setDraftState] = useState<DraftState>({
        blueBans: [],
        redBans: [],
        bluePicks: [],
        redPicks: [],
        currentPhase: 'ban',
        currentTurn: 'blue',
    });

    return (
        <DraftContext.Provider value={{ draftState, setDraftState }}>
            {children}
        </DraftContext.Provider>
    );
};