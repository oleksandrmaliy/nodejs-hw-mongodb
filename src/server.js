import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { HttpError } from 'http-errors';

import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Hello World!',
    });
  });

  app.use(contactsRouter);

  // app.use('*', (req, res, next) => {
  //   res.status(404).json({
  //     message: 'Not found',
  //   });
  // });

  const notFoundHandler = (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  };

  app.use('*', notFoundHandler);
  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'Something went wrong',
  //     error: err.message,
  //   });
  // });

  const errorHandler = (err, req, res, next) => {
    // Перевірка, чи отримали ми помилку від createHttpError
    if (err instanceof HttpError) {
      res.status(err.status).json({
        status: err.status,
        message: err.name,
        data: err,
      });
      return;
    }

    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      data: err.message,
    });
  };

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
