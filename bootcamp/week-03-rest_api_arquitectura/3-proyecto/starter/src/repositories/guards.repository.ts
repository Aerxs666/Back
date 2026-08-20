

import { Guard, CreateGuardDto, UpdateGuardDto } from '../types';

const store: Guard[] = [
  { id: 1, name: 'Carlos Ramírez', category: 'armado', hourlyRate: 12.5, yearsOfExperience: 8, active: true, createdAt: new Date().toISOString() },
  { id: 2, name: 'Laura Gómez', category: 'escolta', hourlyRate: 15.0, yearsOfExperience: 6, active: true, createdAt: new Date().toISOString() },
  { id: 3, name: 'Andrés Torres', category: 'desarmado', hourlyRate: 8.0, yearsOfExperience: 2, active: true, createdAt: new Date().toISOString() },
  { id: 4, name: 'María Fernanda Ruiz', category: 'supervision', hourlyRate: 18.75, yearsOfExperience: 10, active: true, createdAt: new Date().toISOString() },
  { id: 5, name: 'Julián Pérez', category: 'vigilancia_electronica', hourlyRate: 10.5, yearsOfExperience: 4, active: true, createdAt: new Date().toISOString() },
];

let nextId = 6;

export async function findAll(): Promise<Guard[]> {
  return [...store];
}

export async function findById(id: number): Promise<Guard | undefined> {
  return store.find((guard) => guard.id === id);
}

export async function create(dto: CreateGuardDto): Promise<Guard> {
  const guard: Guard = { id: nextId++, ...dto, createdAt: new Date().toISOString() };
  store.push(guard);
  return { ...guard };
}

export async function update(id: number, dto: UpdateGuardDto): Promise<Guard | undefined> {
  const index = store.findIndex((guard) => guard.id === id);

  if (index === -1) {
    return undefined;
  }

  store[index] = { ...store[index], ...dto };
  return { ...store[index] };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((guard) => guard.id === id);

  if (index === -1) {
    return false;
  }

  store.splice(index, 1);
  return true;
}