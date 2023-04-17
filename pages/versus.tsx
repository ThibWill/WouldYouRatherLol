import Image from 'next/image';
import { URLSplashArt } from '../services/communityDragon';

export function championsVersusSplashart(championName1: string): JSX.Element {
  return (
    <Image width="500" height="500" src={URLSplashArt(championName1)} alt={championName1}></Image>
  );
}

export default function Versus() {
  return (
    <>
      <main className="flex flex-row min-h-full justify-between items-stretch">
        <section className='grow'>
        </section>
          {championsVersusSplashart('alistar')}
        <section className='grow'>
          {championsVersusSplashart('anivia')}
        </section>
      </main>
    </>
  )
}