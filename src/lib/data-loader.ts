import { promises as fs } from "fs";
import path from "path";
import type { EventRecord, MechanicsRecord, PokemonRecord, ReleaseRecord } from "./domain/types";

const dataDir = path.join(process.cwd(), "data");

async function readJson<T>(file: string): Promise<T> {
  const filePath = path.join(dataDir, file);
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content) as T;
}

export async function getPokemonData() {
  return readJson<PokemonRecord[]>("pokemon.json");
}

export async function getReleaseData() {
  return readJson<ReleaseRecord[]>("releases.json");
}

export async function getEventData() {
  return readJson<EventRecord[]>("events.json");
}

export async function getMechanicsData() {
  return readJson<MechanicsRecord[]>("mechanics.json");
}
