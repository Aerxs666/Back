import { Guard, PaginatedResponse } from '../types';
import * as repo from '../repositories/guards.repository';
import { AppError } from '../errors/AppError';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(opts: FindAllOptions): Promise<PaginatedResponse<Guard>> {
  const { page, limit } = opts;
  const all = await repo.findAll();

  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);

  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Guard> {
  const guard = await repo.findById(id);

  if (!guard) {
    throw new AppError(404, `Guard ${id} not found`);
  }

  return guard;
}

export async function create(dto: repo.CreateGuardRepoDto): Promise<Guard> {
  return repo.create(dto);
}

export async function update(id: number, dto: repo.UpdateGuardRepoDto): Promise<Guard> {
  const exists = await repo.findById(id);

  if (!exists) {
    throw new AppError(404, `Guard ${id} not found`);
  }

  const updated = await repo.update(id, dto);
  return updated!;
}

export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);

  if (!exists) {
    throw new AppError(404, `Guard ${id} not found`);
  }

  await repo.remove(id);
}