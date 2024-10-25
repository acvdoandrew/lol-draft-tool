export async function getChampions() {
    try {
      // Get the latest version first
      const versionResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
      const versions = await versionResponse.json();
      const latestVersion = versions[0];
  
      // Fetch champions data
      const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`
      );
      const data = await response.json();
      
      // Transform the data into a more usable format
      return Object.values(data.data).map((champion: any) => ({
        id: champion.id,
        name: champion.name,
        image: {
          full: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.image.full}`
        }
      }));
    } catch (error) {
      console.error('Error fetching champions:', error);
      return [];
    }
  }