export interface ImageData {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface ChampionData {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    info: {
        attack: number;
        defense: number;
        magic: number;
        difficulty: number;
    };
    image: ImageData;
    tags: string[];
    partype: string;
    stats: Record<string, number>;
}

export interface ChampionsData {
    [key: string]: ChampionData;
}