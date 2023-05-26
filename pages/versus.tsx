import Image from "next/image";
import { useEffect, useState } from "react";
import { URLSplashArt } from "../services/communityDragon";
import { ChampionDTO } from "../types/championDTO";

const addVoteChampion = async (championName: string) => {
  try {
    const response = await fetch("/api/addVote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        championName: championName,
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

const championsVersus = async (): Promise<Array<ChampionDTO> | undefined> => {
  try {
    const response = await fetch("/api/championsVersus", {
      method: "GET"
    });

    if (!response.ok) {
      console.error("Error:", response.status);
      return;
    }

    const champions = await response.json() as Array<ChampionDTO>;

    return champions;
  } catch (error) {
    console.error(error);
    return;
  }
};

function championsVersusSplashArt(championName1: string): JSX.Element {
  return (
    <Image
      className="object-cover cursor-pointer hover:scale-125 duration-300"
      fill={true}
      src={URLSplashArt(championName1)}
      alt={championName1}
    ></Image>
  );
}

export default function VersusLoL()
{
  const [champions, setChampions] = useState<Array<ChampionDTO> | undefined>([]);
  const [displayMode, setDisplayMode] = useState(true);

  useEffect(() => {
    championsVersus()
      .then(champions => setChampions(champions))
  }, [])

  const executeStateAndChangeStateOnClick = async (championName?: string) => {
    if (!displayMode) {
      const newChampions = await championsVersus();
      setChampions(newChampions);
    } else {
      if (!championName) {
        return console.error('No champion to vote for');
      }

      await addVoteChampion(championName);
    }
    
    setDisplayMode(!displayMode);
  }

  const displayPanels = (): Array<JSX.Element> => {

    if (!champions) {
      return ([]);
    }

    return champions.map((c, i) => (
      <section
          className="h-full relative w-[50%] flex justify-center items-center overflow-hidden"
          key={i}
          onClick={() => executeStateAndChangeStateOnClick(displayMode ? c.name : undefined)}
        >
          {/* championsVersusSplashArt(c.name) */}
          <span className="z-20 text-white text-2xl font-stroke-blue-primary flex flex-col">
            <span>{c.name}</span>
            {!displayMode && <span>VOTES : {c.votes}</span>}
          </span>
      </section>
    ))
  }

  return (
    <>
      <main className="flex flex-col grow">
        <div className="flex flex-row justify-between items-stretch grow">
          {displayPanels()}
        </div>
      </main>
    </>
  );
}
