import { Router } from 'express';
import * as store from '../store.js';
import type { CreateGuardDto, UpdateGuardDto } from '../types.js';

export const guardsRouter = Router();


guardsRouter.get('/', (_req, res) => {
  res.status(200).json(store.getAll());
});


guardsRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const guard = store.getById(id);

  if (!guard) {
    res.status(404).json({ error: 'Guardia no encontrado' });
    return;
  }

  res.status(200).json(guard);
});

guardsRouter.post('/', (req, res) => {
  const data: CreateGuardDto = req.body;
  const newGuard = store.create(data);
  res.status(201).json(newGuard);
});


guardsRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const data: UpdateGuardDto = req.body;
  const updatedGuard = store.update(id, data);

  if (!updatedGuard) {
    res.status(404).json({ error: 'Guardia no encontrado' });
    return;
  }

  res.status(200).json(updatedGuard);
});


guardsRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const deleted = store.remove(id);

  if (!deleted) {
    res.status(404).json({ error: 'Guardia no encontrado' });
    return;
  }

  res.status(204).send();
});
