import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { Report } from './types.js';

export async function writeReport(report: Report): Promise<void> {
  const outputDir = join(import.meta.dirname, '..', 'output');
  const outputPath = join(outputDir, 'report.json');

  await mkdir(outputDir, { recursive: true });

  const json = JSON.stringify(report, null, 2);
  await writeFile(outputPath, json);

  console.log('Reporte guardado en:', outputPath);
}