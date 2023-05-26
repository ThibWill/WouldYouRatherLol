import { ChampionDTO } from "../types/championDTO";

export const addVoteChampion = async (champion1Name : string, champion2Name : string, choice: string) => {
  try {
    const response = await fetch("/api/voteChampionVersus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        champion1Name: champion1Name,
        champion2Name: champion2Name,
        choice: choice,
      }),
    });

    if (!response.ok) {
      console.error("Error:", response.status);
      return;
    }

  } catch (error) {
    console.error(error);
  }
};

export const championsVersus = async (): Promise<Array<ChampionDTO> | []> => {
  try {
    const response = await fetch("/api/championsVersus", {
      method: "GET"
    });

    if (!response.ok) {
      console.error("Error:", response.status);
      return [];
    }

    const champions = await response.json() as Array<ChampionDTO>;

    return champions;
  } catch (error) {
    console.error(error);
    return [];
  }
};