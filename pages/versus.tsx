import Image from "next/image";
import { useEffect, useState } from "react";
import { URLSplashArt } from "../services/communityDragon";
import { ChampionDTO } from "../types/championDTO";
import { championsVersus, addVoteChampion } from "../services/localAPI";

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
  const [champions, setChampions] = useState<Array<ChampionDTO> | []>([]);
  const [displayMode, setDisplayMode] = useState(true);

  useEffect(() => {
    championsVersus()
      .then(champions => setChampions(champions))
  }, [])

  const executeStateAndChangeStateOnClick = async (choice?: string) => {
    if (!displayMode) {
      const newChampions = await championsVersus();
      setChampions(newChampions);
    } else {
      if (!choice) {
        return console.error('No champion to vote for');
      } 
      const champion1Name = champions[0].name;
      const champion2Name = champions[1].name;
      await addVoteChampion(champion1Name, champion2Name, choice);
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
