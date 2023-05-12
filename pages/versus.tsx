import Image from "next/image";
import { useState } from "react";
import { URLSplashArt } from "../services/communityDragon";
import { ChampionDTO } from "../types/championDTO";
import { PrismaClient, Champion, Versus } from "@prisma/client";
import { useRouter } from "next/router";

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

export default function VersusLoL({
  championsVersus,
}: {
  championsVersus: Array<ChampionDTO>;
}) {
  const router = useRouter();
  const [champions, setChampions] = useState(championsVersus);

  // voteForChampion(champions, "alistar");

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

    setTimeout(() => router.reload(), 5000);
  };

  return (
    <>
      <main className="flex flex-col grow">
        <div className="flex flex-row justify-between items-stretch grow">
          {champions.map((c, i) => (
            <section
              className="h-full relative w-[50%] flex justify-center items-center overflow-hidden"
              key={i}
              onClick={() => addVoteChampion(c.name)}
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
