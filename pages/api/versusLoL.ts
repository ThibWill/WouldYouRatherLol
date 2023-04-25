import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Champion } from "@prisma/client";

const prisma = new PrismaClient();

export default async function versusLoL(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).send("Not found");
  }

  const { champion1Name, champion2Name } = req.body;
  console.log(champion1Name);

  const champ1: Champion | null = await prisma.champion.findFirst({
    where: {
      name: champion1Name,
    },
  });

  const champ2: Champion | null = await prisma.champion.findFirst({
    where: {
      name: champion2Name,
    },
  });

  if (!champ1 || !champ2) {
    return res.status(404).json({ err: "Champion not found" });
  }
  return res.status(200).json({ votes: champ.votes });
}
