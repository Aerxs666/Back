import { Guard } from '../types';

export type CreateGuardRepoDto = Omit<Guard, 'id' | 'createdAt'>;
export type UpdateGuardRepoDto = Partial<CreateGuardRepoDto>;

let guards: Guard[] = [
  { id: 1, name: 'Carlos Ramírez', category: 'armado', hourlyRate: 12.5, yearsOfExperience: 8, active: true, createdAt: new Date() },
  { id: 2, name: 'Laura Gómez', category: 'escolta', hourlyRate: 15.0, yearsOfExperience: 6, active: true, createdAt: new Date() },
  { id: 3, name: 'Andrés Torres', category: 'desarmado', hourlyRate: 8.0, yearsOfExperience: 2, active: true, createdAt: new Date() },
];

let nextId = 4;

export async function findAll(): Promise<Guard[]> {
  return [...guards];
}

export async function findById(id: number): Promise<Guard | undefined> {
  return guards.find((guard) => guard.id === id);
}

export async function create(dto: CreateGuardRepoDto): Promise<Guard> {
  const guard: Guard = { id: nextId++, ...dto, createdAt: new Date() };
  guards.push(guard);
  return { ...guard };
}

export async function update(id: number, dto: UpdateGuardRepoDto): Promise<Guard | undefined> {
  const index = guards.findIndex((guard) => guard.id === id);

  if (index === -1) {
    return undefined;
  }

  guards[index] = { ...guards[index], ...dto };
  return { ...guards[index] };
}

export async function remove(id: number): Promise<boolean> {
  const index = guards.findIndex((guard) => guard.id === id);

  if (index === -1) {
    return false;
  }

  guards.splice(index, 1);
  return true;
}