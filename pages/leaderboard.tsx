import { PrismaClient, Champion } from "@prisma/client";

type ChampionDTO = {
  name: string;
  votes: number;
};

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const champions = await prisma.champion.findMany();
  const championsSortedByVotes = champions.sort((champ1, champ2) => {
    return champ1.votes - champ2.votes;
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
          <table className="bg-white w-full rounded-md text-center">
            <thead>
              <tr className="h-14">
                <td>Rank</td>
                <td>Champions</td>
                <td>Votes</td>
              </tr>
            </thead>
            <tbody>
              {champions.map((champion, rankChampion: number) => {
                return (
                  <tr key={rankChampion} className="h-14 odd:bg-blue-secondary">
                    <td>{rankChampion + 1}</td>
                    <td>{champion.name}</td>
                    <td>{champion.votes}</td>
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
