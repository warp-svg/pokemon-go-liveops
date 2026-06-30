import { promises as fs } from "fs";
import path from "path";
import type { EventEntry, MechanicsEntry, PokemonEntry, ReleaseEntry } from "./types";

const dataDir = path.join(process.cwd(), "data");

async function readJson<T>(file: string): Promise<T> {
  const filePath = path.join(dataDir, file);
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content) as T;
}

export async function getPokemonData() {
  return readJson<PokemonEntry[]>("pokemon.json");
}

export async function getReleaseData() {
  return readJson<ReleaseEntry[]>("releases.json");
}

export async function getEventData() {
  return readJson<EventEntry[]>("events.json");
}

export async function getMechanicsData() {
  return readJson<MechanicsEntry[]>("mechanics.json");
}
