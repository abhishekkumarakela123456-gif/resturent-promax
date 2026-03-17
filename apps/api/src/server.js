import { createServer } from 'http';
import { Server } from 'socket.io';
import { app } from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const bootstrap = async () => {
  await connectDB();
  const httpServer = createServer(app);
  const io = new Server(httpServer, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    socket.on('join-restaurant', (restaurantId) => socket.join(String(restaurantId)));
  });

  app.set('io', io);

  httpServer.listen(env.port, () => {
    console.log(`API listening on ${env.port}`);
  });
};

bootstrap();
