import { PrismaClient } from "@prisma/client"

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const champions = await prisma.champion.findMany()
  return {
    props : { champions: champions.map(champion => champion.name) }
  }
}

export default function Leaderboard({ champions }: { champions: Array<string> }) {
  return (
    <>
      <main className="flex flex-row min-h-full justify-between items-stretch">
        <section className='bg-green grow'>
          { champions }
        </section>
      </main>
    </>
  )
}