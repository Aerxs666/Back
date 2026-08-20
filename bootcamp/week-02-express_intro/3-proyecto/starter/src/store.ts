import type { Guard, CreateGuardDto, UpdateGuardDto } from './types.js';


const guards: Guard[] = [
  { id: 1, name: 'Carlos Ramírez', category: 'armado', hourlyRate: 12.5, yearsOfExperience: 8, active: true },
  { id: 2, name: 'Laura Gómez', category: 'escolta', hourlyRate: 15.0, yearsOfExperience: 6, active: true },
  { id: 3, name: 'Andrés Torres', category: 'desarmado', hourlyRate: 8.0, yearsOfExperience: 2, active: true },
  { id: 4, name: 'María Fernanda Ruiz', category: 'supervision', hourlyRate: 18.75, yearsOfExperience: 10, active: true },
  { id: 5, name: 'Julián Pérez', category: 'vigilancia_electronica', hourlyRate: 10.5, yearsOfExperience: 4, active: true },
];

let nextId = 6;

export function getAll(): Guard[] {
  return guards;
}

export function getById(id: number): Guard | undefined {
  return guards.find((guard) => guard.id === id);
}

export function create(data: CreateGuardDto): Guard {
  const newGuard: Guard = { id: nextId++, ...data };
  guards.push(newGuard);
  return newGuard;
}

export function update(id: number, data: UpdateGuardDto): Guard | undefined {
  const guard = guards.find((g) => g.id === id);

  if (!guard) {
    return undefined;
  }

  Object.assign(guard, data);
  return guard;
}

export function remove(id: number): boolean {
  const index = guards.findIndex((guard) => guard.id === id);

  if (index === -1) {
    return false;
  }

  guards.splice(index, 1);
  return true;
}