
import { Request, Response, NextFunction } from 'express';
import * as service from '../services/guards.service';
import { CreateGuardDto, UpdateGuardDto, ErrorResponse } from '../types';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await service.findAll({ page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const guard = await service.findById(id);

    if (!guard) {
      const response: ErrorResponse = { error: 'Not Found', message: `Guard ${id} not found` };
      res.status(404).json(response);
      return;
    }

    res.json({ data: guard });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto: CreateGuardDto = req.body;
    const guard = await service.create(dto);
    res.status(201).json({ data: guard });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const dto: UpdateGuardDto = req.body;
    const guard = await service.update(id, dto);

    if (!guard) {
      const response: ErrorResponse = { error: 'Not Found', message: `Guard ${id} not found` };
      res.status(404).json(response);
      return;
    }

    res.json({ data: guard });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const deleted = await service.remove(id);

    if (!deleted) {
      const response: ErrorResponse = { error: 'Not Found', message: `Guard ${id} not found` };
      res.status(404).json(response);
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}