import { Champion } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from "../../prisma/prismaClient";

export default async function championsVersus(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const championVersus: Array<Champion> = 
    await PrismaClient.$queryRaw`SELECT * FROM "public"."Champion" ORDER BY random() LIMIT 2`;

  return res.status(200).send(
    championVersus.map((champion) => ({
      name: champion.name,
      votes: champion.votes,
    })),
  );
}