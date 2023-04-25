import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { URLSquare } from "../services/communityDragon";

type ChampionDTO = {
  name: string;
  votes: number;
};

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const champions = await prisma.champion.findMany();
  const championsSortedByVotes = champions.sort((champ1, champ2) => {
    return champ2.votes - champ1.votes;
  });
  return {
    props: {
      champions: championsSortedByVotes.map((champion) => ({
        name: champion.name,
        votes: champion.votes,
      })),
    },
  };
}

export default function Leaderboard({
  champions,
}: {
  champions: Array<ChampionDTO>;
}) {
  return (
    <>
      <main className="flex flex-col items-center">
        <div className="mt-20 mb-6 w-layout bg-blue-primary p-4 rounded-md">
          <table className="bg-white w-full rounded-md">
            <thead>
              <tr className="h-14">
                <th className="w-24 font-normal text-center">Rank</th>
                <th className="w-60 font-normal">Champion</th>
                <th className="font-normal">Votes</th>
              </tr>
            </thead>
            <tbody>
              {champions.map((champion, rankChampion: number) => {
                return (
                  <tr key={rankChampion} className="h-14 odd:bg-blue-secondary">
                    <td className="text-center">{rankChampion + 1}</td>
                    <td>
                      <div className="flex flex-row gap-4 items-center pl-14">
                        <Image
                          width="32"
                          height="32"
                          src={URLSquare(champion.name)}
                          alt={champion.name}
                        ></Image>
                        <span>{champion.name}</span>
                      </div>
                    </td>
                    <td className="text-center">{champion.votes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
