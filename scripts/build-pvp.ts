import { writeFile } from "fs/promises";
import path from "path";
import { fetchPvpRankings } from "../src/lib/data-sources/pvpoke";

export async function buildPvp(outputDir: string) {
  const pvp = await fetchPvpRankings();
  await writeFile(path.join(outputDir, "pvp-rankings.json"), JSON.stringify(pvp, null, 2));
  return pvp;
}
