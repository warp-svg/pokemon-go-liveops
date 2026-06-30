import { writeFile } from "fs/promises";
import path from "path";
import { fetchGoAvailability } from "../src/lib/data-sources/bulbapedia";
import { fetchLiveOpsEvents } from "../src/lib/data-sources/leekduck";

export async function buildEvents(outputDir: string) {
  const availability = await fetchGoAvailability();
  const events = await fetchLiveOpsEvents();
  await writeFile(path.join(outputDir, "pokemon-go-status.json"), JSON.stringify(availability, null, 2));
  await writeFile(path.join(outputDir, "events.json"), JSON.stringify(events, null, 2));
  return { availability, events };
}
