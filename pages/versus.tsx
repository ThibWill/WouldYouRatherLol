import Image from 'next/image';
import { URLSplashArt } from '../services/communityDragon';

export function championsVersusSplashart(championName1: string, championName2: string): Array<JSX.Element> {
  return [
    <Image width="500" height="500" src={URLSplashArt(championName1)} alt={championName1}></Image>,
    <Image width="500" height="500" src={URLSplashArt(championName2)} alt={championName2}></Image>
  ]
}

export default function Versus() {
  return (
    <>
      <main className="flex flex-row min-h-full justify-between items-stretch">
        <section className='bg-green grow'>
        </section>
          {championsVersusSplashart('alistar', 'anivia')}
        <section className='bg-blue grow'>
          Image 2
        </section>
      </main>
    </>
  )
}