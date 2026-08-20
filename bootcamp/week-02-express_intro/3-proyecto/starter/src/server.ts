import { createApp } from './app.js';

const PORT = process.env.PORT ?? '3000';
const app = createApp();

const server = app.listen(Number(PORT), () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


function shutdown() {
  console.log('Cerrando servidor...');

  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);