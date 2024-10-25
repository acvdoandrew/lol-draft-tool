import { version } from 'os';
import { ChampionsData } from './types';

export async function fetchChampions(): Promise<ChampionsData> {
    // Fetch the latest version number
    const versionsResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const versions: string[] = await versionsResponse.json();
    const latestVersion = versions[0];

    // Fetch champion data for the latest version
    const championsResponse = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`
    );
    const championsData = await championsResponse.json();

    return championsData.data;
}