import Image from 'next/image'
import { Inter } from 'next/font/google'
import { PrismaClient, Champion } from '@prisma/client'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const champions = await prisma.champion.findMany();
  return {
    props : { champions: champions.map(champion => champion.name) }
  }
}

export default function Home({ champions }: { champions: Array<string> }) {
  const router = useRouter();
  return (
    <>
      <main className="flex flex-row min-h-full justify-between items-stretch">
        <button onClick={() => router.push('/leaderboard')}>Leaderboard</button>
        <button onClick={() => router.push('/versus')}>Versus</button>
      </main>
    </>
  )
}
