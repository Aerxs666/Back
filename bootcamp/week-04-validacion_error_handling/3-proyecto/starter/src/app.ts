
import express from 'express';
import { morganMiddleware } from './config/logger';
import guardsRouter from './routes/guards.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(morganMiddleware);

// Health check — no requiere cambios
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/guards', guardsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;