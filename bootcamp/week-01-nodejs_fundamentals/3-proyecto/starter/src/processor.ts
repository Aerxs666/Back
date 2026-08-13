import type { Guard, GuardSummary } from './types.js';

function getUniqueCategories(guards: Guard[]): string[] {
  const categories = new Set<string>();
  for (const guard of guards) {
    categories.add(guard.category);
  }
  return Array.from(categories);
}

export function filterByCategory(guards: Guard[], categoryFilter: string | null): Guard[] {
  if (categoryFilter === null) {
    return guards;
  }

  const result: Guard[] = [];
  for (const guard of guards) {
    if (guard.category.toLowerCase() === categoryFilter.toLowerCase()) {
      result.push(guard);
    }
  }

  if (result.length === 0) {
    const disponibles = getUniqueCategories(guards).join(', ');
    throw new Error(`No hay guardias con la categoría "${categoryFilter}". Categorías disponibles: ${disponibles}`);
  }

  return result;
}

export function calculateSummary(guards: Guard[]): GuardSummary {
  let activeCount = 0;
  let inactiveCount = 0;
  let sumOfRates = 0;

  let mostExpensive = guards[0];
  let cheapest = guards[0];

  for (const guard of guards) {
    sumOfRates += guard.hourlyRate;

    if (guard.active) {
      activeCount++;
    } else {
      inactiveCount++;
    }

    if (guard.hourlyRate > mostExpensive.hourlyRate) {
      mostExpensive = guard;
    }

    if (guard.hourlyRate < cheapest.hourlyRate) {
      cheapest = guard;
    }
  }

  const averageHourlyRate = Math.round((sumOfRates / guards.length) * 100) / 100;

  return {
    total: guards.length,
    active: activeCount,
    inactive: inactiveCount,
    averageHourlyRate,
    mostExpensive,
    cheapest,
    categories: getUniqueCategories(guards),
  };
}