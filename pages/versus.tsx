import Image from "next/image";
import { useState } from "react";
import { URLSplashArt } from "../services/communityDragon";
import { ChampionDTO } from "../types/championDTO";
import { PrismaClient, Champion, Versus } from "@prisma/client";

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const championVersus: Array<Champion> =
    await prisma.$queryRaw`SELECT * FROM "public"."Champion" ORDER BY random() LIMIT 2`;

  return {
    props: {
      championsVersus: championVersus.map((champion) => ({
        name: champion.name,
        votes: champion.votes,
      })),
    },
  };
}

export function championsVersusSplashart(championName1: string): JSX.Element {
  return (
    <Image
      className="object-cover cursor-pointer hover:scale-125 duration-300"
      fill={true}
      src={URLSplashArt(championName1)}
      alt={championName1}
    ></Image>
  );
}

export async function voteForChampion(
  champions: Array<ChampionDTO>,
  championsChoice: string
) {
  const prisma = new PrismaClient();

  if (champions.length !== 2) {
    console.error("Impossible to vote");
    return;
  }

  const sortedChampionsDB = champions.sort().map(async (champion) => {
    const championDB = await prisma.champion.findFirst({
      where: { name: champion.name },
    });
    return championDB;
  });
  const champion1DB = sortedChampionsDB[0];
  const champion2DB = sortedChampionsDB[1];

  if (!champion1DB || !champion2DB) {
    console.error("Impossible to vote");
    return null;
  }

  console.log(champion1DB, champion2DB);

  /*const versus = await prisma.versus.findFirst({
    where: {
      AND: [
        { champion1: { name: champion1DB.name } },
        { champion2: { name: champion2DB.name } },
      ],
    },
  });

  if (!versus) {
    await prisma.versus.create({
      data: {
        ch,
      },
    });
  }*/
}

export default function VersusLoL({
  championsVersus,
}: {
  championsVersus: Array<ChampionDTO>;
}) {
  const [champions, setChampions] = useState(championsVersus);

  // voteForChampion(champions, "alistar");

  return (
    <>
      <main className="flex flex-col grow">
        <div className="flex flex-row justify-between items-stretch grow">
          {champions.map((c, i) => (
            <section
              className="h-full relative w-[50%] flex justify-center items-center overflow-hidden"
              key={i}
            >
              {championsVersusSplashart(c.name)}
              <span className="z-20 text-white text-2xl font-stroke-blue-primary">
                {c.name}
              </span>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
