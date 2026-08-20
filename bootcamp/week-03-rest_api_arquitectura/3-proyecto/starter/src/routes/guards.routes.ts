

import { Router } from 'express';
import * as controller from '../controllers/guards.controller';

export const guardsRouter = Router();

guardsRouter.get('/', controller.getAll);
guardsRouter.get('/:id', controller.getById);
guardsRouter.post('/', controller.create);
guardsRouter.put('/:id', controller.update);
guardsRouter.delete('/:id', controller.remove);