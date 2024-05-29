import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './src/utils/env.js';
dotenv.config();
// import { env } from '../.env';

const PORT = Number(env('PORT', '3000'));

// const PORT = 3000;

export const setupServer = () => {
  const app = express();
  //   app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    // next(console.log('zzz'));
    res.json({
      message: 'Hello World!',
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });
  //   app.use(studentsRouter);

  //   app.use('*', notFoundHandler);

  //   app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
