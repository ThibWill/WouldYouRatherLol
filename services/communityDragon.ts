const BASE_URL_CD = 'https://cdn.communitydragon.org'

export function URLSplashArt(championName: string) {
  return `${BASE_URL_CD}/latest/champion/${championName}/splash-art`;
}