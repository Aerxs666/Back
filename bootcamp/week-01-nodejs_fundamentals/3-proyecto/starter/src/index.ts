import { readGuards } from './reader.js';
import { filterByCategory, calculateSummary } from './processor.js';
import { writeReport } from './writer.js';
import type { Guard, Report } from './types.js';

const args = process.argv.slice(2);
const categoryIndex = args.indexOf('--category');
const categoryFilter: string | null = categoryIndex !== -1 ? args[categoryIndex + 1] : null;

async function main(): Promise<void> {
  let guards: Guard[];

  try {
    guards = await readGuards();
  } catch (error) {
    console.log('Error leyendo los datos:', error);
    process.exitCode = 1;
    return;
  }

  let filteredGuards: Guard[];

  try {
    filteredGuards = filterByCategory(guards, categoryFilter);
  } catch (error) {
    console.log(error);
    process.exitCode = 1;
    return;
  }

  const summary = calculateSummary(filteredGuards);

  console.log('--- Reporte de Guardias ---');
  console.log('Filtro:', categoryFilter ?? 'ninguno');
  console.log('Total:', summary.total);
  console.log('Activos:', summary.active);
  console.log('Inactivos:', summary.inactive);
  console.log('Tarifa promedio:', summary.averageHourlyRate);
  console.log('Guardia con la tarifa más alta:', summary.mostExpensive.name);
  console.log('Guardia con la tarifa más baja:', summary.cheapest.name);
  console.log('Categorías:', summary.categories.join(', '));

  const report: Report = {
    generatedAt: new Date().toISOString(),
    appliedFilter: categoryFilter,
    summary,
    guards: filteredGuards,
  };

  await writeReport(report);
}

main();