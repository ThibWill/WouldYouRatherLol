import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../prisma/prismaClient";

export default async function addVote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).send("Not found");
  }

  const { championName } = req.body;

  try {
    await prismaClient.champion.update({
      where: {
        name: championName,
      },
      data: {
        votes: {
          increment: 1,
        },
      },
    });
    return res.status(200).send("Vote + 1");
  } catch (error) {
    return res.status(404).send("Champion not found");
  }
}
