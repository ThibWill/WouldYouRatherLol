import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const champions = [
  "Akali",
  "Brand",
  "Kennen",
  "Shen",
  "Alistar",
  "Zoe",
  "Yuumi",
  "Graves",
  "Anivia",
];

async function main() {
  const promisesChampion = champions.map((championName) =>
    prisma.champion.create({
      data: {
        name: championName,
        votes: Math.round(Math.random() * 1000),
      },
    })
  );
  Promise.all(promisesChampion);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
