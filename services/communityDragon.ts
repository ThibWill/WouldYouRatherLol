const BASE_URL_CD = "https://cdn.communitydragon.org";

function mapChampionName(championName: string) {
  if (championName.toLowerCase() == "nunu & willump") {
    return "Nunu";
  } else if (championName.toLowerCase() == "renata glasc") {
    return "Renata";
  }

  return championName.replaceAll(/ |'/g, "");
}

export function URLSplashArt(championName: string) {
  return `${BASE_URL_CD}/latest/champion/${mapChampionName(
    championName
  )}/splash-art`;
}

export function URLSquare(championName: string) {
  return `${BASE_URL_CD}/latest/champion/${mapChampionName(
    championName
  )}/square`;
}
