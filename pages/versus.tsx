import Image from "next/image";
import { useEffect, useState } from "react";
import { URLSplashArt } from "../services/communityDragon";
import { ChampionDTO } from "../types/championDTO";
import { championsVersus, addVoteChampion } from "../services/localAPI";
import styles from '../styles/versus.module.css'

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

    return champions.map((champion, i) => (
      <section
          className="h-full relative w-[50%] flex justify-center items-center overflow-hidden cursor-pointer"
          key={i}
          onClick={() => executeStateAndChangeStateOnClick(displayMode ? champion.name : undefined)}
        >
          { championsVersusSplashArt(champion.name) }
          <span 
            className="z-20 text-white text-center text-2xl font-stroke-blue-primary flex flex-col"
          >
            <span>{champion.name}</span>
            {!displayMode && 
              <span className={styles["fade-in-text"]}>
                {(
                  (champion.votes * 100) / 
                  champions.map(champion => champion.votes).reduce((acc: number, votes: number) => acc + votes, 0)
                ).toFixed(1)}%
              </span>
            }
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
