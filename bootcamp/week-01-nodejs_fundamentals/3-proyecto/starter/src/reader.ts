import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Guard } from './types.js';

export async function readGuards(): Promise<Guard[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'guards.json');

  try {
    const data = await readFile(filePath, 'utf-8');
    const guards: Guard[] = JSON.parse(data);
    return guards;
  } catch (error) {
    throw new Error(`No se pudo leer el archivo guards.json (${filePath}): ${error}`);
  }
}