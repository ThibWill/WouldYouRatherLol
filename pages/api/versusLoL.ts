import type { NextApiRequest, NextApiResponse } from "next";
import { Champion, Versus } from "@prisma/client";
import prisma from "../../prisma/prismaClient";

async function findFirstChampionOnName(championName: string): Promise<Champion | null> {
  const champion: Champion | null = await prisma.champion.findFirst({
    where: {
      name: championName,
    },
  })

  return champion;
}

async function findFirstVersusOnChampionsName(champion1Name: string, champion2Name: string): Promise<Versus | null> {
  const versus: Versus | null = await prisma.versus.findFirst({
    where: {
      AND: [
        { champion1: { name : champion1Name } },
        { champion2: { name : champion2Name } },
      ],
    },
    include: {
      champion1: true,
      champion2: true,
    },
  });

  return versus;
}

async function incrementVotesChampionOnName(championName: string): Promise<void> {
  await prisma.champion.update({
    where: {
      name: championName
    },
    data: {
      votes: { increment: 1}
    }
  });
}

export default async function versusLoL(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).send("Not found");
  }

  const { champion1Name, champion2Name, choice } = req.body;

  const champion1 = await findFirstChampionOnName(champion1Name);
  const champion2 = await findFirstChampionOnName(champion2Name);

  if (!champion1 || !champion2 || champion1Name === champion2Name || ![champion1Name, champion2Name].includes(choice)) {
    return res.status(400).json({ err: "Bad inputs" });
  }

  const versus = await findFirstVersusOnChampionsName(champion1Name, champion2Name);

  // TODO: Refacto to upsert
  if (versus) {
    await prisma.versus.update({
      where: {
        id: versus.id
      },
      data: {
        champion1Votes: choice === champion1Name ? versus.champion1Votes + 1 : versus.champion1Votes,
        champion2Votes: choice === champion2Name ? versus.champion2Votes + 1 : versus.champion2Votes
      }
    });
  } else {
    await prisma.versus.create({
      data: {
        champion1Votes: choice === champion1Name ? 1 : 0,
        champion2Votes: choice === champion2Name ? 1 : 0,
        champion1: {
          connect: {
            id: champion1.id
          }
        },
        champion2: {
          connect: {
            id: champion2.id
          }
        }
      }
    });
  }

  incrementVotesChampionOnName(choice);

  return res.status(200).json({ mess: "updated" });
}
