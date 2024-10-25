export type DraftPhase = {
    team: 'Blue' | 'Red';
    action: 'Ban' | 'Pick';
    index: number;
};

export type TeamState = {
    picks: string[];
    bans: string[];
}